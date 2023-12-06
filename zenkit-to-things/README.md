# zenkit2things
> Transforms Zenkit ToDo export output into a Things import URL.

## Description
The tool takes as an input a list of paths to Zenkit ToDo exports JSON files.
You can obtain these files by right-clicking on a project and selecting "Setting > Export as JSON".
The output generated is a Things import URL of those projects that you can paste in your browser.
Things will opena and import those projects.

## Getting started
```
deno install --allow-read 
```

## Usage
```
zenkit2things [PATH...]
```

### Options
- `--help`:  Display the help message.
