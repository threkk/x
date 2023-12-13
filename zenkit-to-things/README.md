# zenkit2things
> Transforms Zenkit ToDo export output into a Things import URL.

## How it works
The tool takes as an input a list of paths to Zenkit ToDo exports JSON files.
You can obtain these files by right-clicking on a project and selecting "Setting > Export as JSON".
The output generated is a Things import URL of those projects that you can paste in your browser.
Things will opena and import those projects.

### Limitations
This software was made to fulfill my needs, and the way I used the application.
This means:

- You can only import **projects**. You cannot import folders of projects.
- Comments, tags, and attachments are not supported.
- Starred items are not imported as there is no equivalent.

## Status
The status of the software is **completed**.
It will not receive any new feature, support, or bugfix.

## Getting started
```
deno install --allow-read https://raw.githubusercontent.com/threkk/x/master/zenkit-to-things/zenkit2things.ts
```

## Usage
```
zenkit2things [PATH...]
```

### Options
- `--help`:  Display the help message.
- `--output`: Output format, choice between URL or JSON. Defaults to URL.

## License
MIT
