import { Item, Project, ToDo, DateString} from "./schemas.ts";

export function makeItem(title: string, completed = false): Item {
  return {
    type: "checklist-item",
    attributes: {
      title,
      completed,
    },
  };
}

interface makeToDoProps {
  title: string;
  when: DateString;
  notes: string;
  completed: boolean;
  "checklist-items": Item[];
}
export function makeToDo(
  props: Partial<makeToDoProps> & { title: string },
): ToDo {
  const { title, when, notes, completed } = props;
  return {
    type: "to-do",
    attributes: {
      title,
      when,
      notes,
      completed: completed ?? false,
      "checklist-items": props["checklist-items"],
    },
  };
}

export function makeProject(title: string, items: ToDo[]): Project {
  return {
    type: "project",
    attributes: {
      title,
      items,
    },
  };
}

export function thingify(projects: Project[]): string {
  const encoded = projects.map(p => encodeURI(JSON.stringify(p)));
  return `things:///json?data=[${encoded.join(',')}]`;
}
