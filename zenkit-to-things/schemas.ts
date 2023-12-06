export type DateString = string;
const DATE_FORMAT = /^\d{4}-\d{2}-\d{2}$/;

export function isDateString(input: string): input is DateString {
  return DATE_FORMAT.exec(input) !== null;
}

export type Item = {
  type: "checklist-item";
  attributes: {
    title: string;
    completed: boolean;
  };
};

export type ToDo = {
  type: "to-do";
  attributes: {
    title: string;
    when: DateString | undefined;
    notes: string | undefined;
    completed: boolean;
    "checklist-items": Item[] | undefined;
  };
};

export type Project = {
  type: "project";
  attributes: {
    title: string;
    items: ToDo[];
  };
};
