import { makeItem, makeProject, makeToDo, thingify } from "./builders.ts";
import { parseArgs } from "./deps.ts";
import type { Project } from "./schemas.ts";

const VERSION = "1.0.0";
const DECODER = new TextDecoder("utf-8");

function printHelp(isError = false) {
  const msg = `zenkit2things v${VERSION}

Transforms Zenkit ToDo export output into a Things import URL.

DESCRIPTION
  The tool takes as an input a list of paths to Zenkit ToDo exports JSON files.
  You can obtain these files by right-clicking on a project and selecting 
  "Setting > Export as JSON". The output generated is a Things import URL of
  those projects that you can paste in your browser. Things will open and 
  import those projects. Alternatively, you can export only the JSON.

USAGE
  $ zenkit2things [PATH...]

OPTIONS
  --help    Display this message.
  --output  Output format, choice between URL or JSON. Defaults to URL.`;
  if (isError) console.error(msg);
  else console.log(msg);
}

function migrateProject(path: string): Project {
  let file;
  try {
    file = Deno.readFileSync(path);
  } catch (e) {
    console.error(`Could not open ${path}`, e);
    Deno.exit(1);
  }
  const content = DECODER.decode(file);
  const zenkit = JSON.parse(content);

  const projectTitle = zenkit?.list?.name;
  if (!projectTitle) {
    console.error(`Could not find a project title on ${path}`);
    Deno.exit(1);
  }

  const entries = zenkit?.entries ?? [];

  const notesKey = zenkit?.elements?.find(
    (e: { name?: string }) => e.name === "Notes",
  )?.uuid;
  const whenKey = zenkit?.elements?.find(
    (e: { name?: string }) => e.name === "Due Date",
  )?.uuid;
  const isDoneKey = zenkit?.elements?.find(
   (e: { name?: string }) => e.name === "Stage",
  )?.uuid;
  const doneKey = zenkit?.elements?.find(
   (e: { name?: string }) => e.name === "Stage",
  )?.elementData?.predefinedCategories?.find(
   (e: { name?: string }) => e.name === "Done",
  )?.id;

  const items = [];
  for (const entry of entries) {
    const title = entry?.displayString;
    if (!title) continue;

    const when = entry[`${whenKey}_date`];
    const notes = entry[`${notesKey}_text`];
    const checklist = entry?.checklists;
    const completed = Array.isArray(entry[`${isDoneKey}_categories`]) && entry[`${isDoneKey}_categories`].includes(doneKey);

    const checklistItems = [];
    if (checklist && Array.isArray(checklist)) {
      for (const item of checklist[0]?.items ?? []) {
        const { text, checked } = item;
        checklistItems.push(makeItem(text, checked));
      }
    }

    if (title) {
      items.push(
        makeToDo({
          "checklist-items": checklistItems,
          completed,
          notes,
          title,
          when,
        }),
      );
    }
  }

  return makeProject(projectTitle, items);
}

if (import.meta.main) {
  const { _, help, output } = parseArgs(Deno.args);
  if (help) {
    printHelp();
    Deno.exit(0);
  }

  if (output && !['json', 'url'].includes(output)) {
    console.error(`Invalid value for output: ${output}.`)
    printHelp(true);
    Deno.exit(1);
  }

  const paths = _.map((p) => Deno.realPathSync(`${p}`));
  const projects = await Promise.all(paths.map((path) => migrateProject(path)));

  console.log(thingify(projects, output === 'json'));
  Deno.exit(0);
}
