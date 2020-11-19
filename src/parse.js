import moment from "moment";

const METADATA_REGEX = /---\n(.+?)\n---/s;
const NEW_LINE_SEPARATOR = "\n";
const KEY_VALUE_SEPARATOR = ":";

const DEFAULT_PROPS = {
  title: "Untitled",
};

export const createTemplate = ({title, subtitle, author}) =>
  `---
title: ${title ?? "Untitled"}
subtitle: ${subtitle ?? "Untitled"}
author: ${author ?? "Anonymous"}
presentedAt: ${moment().format("YYYY-MM-DD")}
---
`;

export const parse = (text) => {
  const matches = text.match(METADATA_REGEX);
  let metadata;

  try {
    metadata = matches[1].split(NEW_LINE_SEPARATOR)
      .map(line => {
        const [key, ...value] = line.split(KEY_VALUE_SEPARATOR);

        return [key, value.join(KEY_VALUE_SEPARATOR).trim()];
      })
      .reduce((previous, [key, value]) => ({
        ...previous,
        [key]: value,
      }), DEFAULT_PROPS);
  } catch (e) {
    metadata = ""
  }

  let firstPage = "";

  if (metadata) {
    const {author, title, subtitle, presentedAt} = metadata;

    firstPage = firstPage
      .concat(title ? `# ${title}\n` : "")
      .concat(subtitle ? `## ${subtitle}\n` : "")
      .concat(author ? `### ${author}\n` : "")
      .concat(presentedAt ? `#### ${presentedAt}\n` : "")
      .concat("\n\n---\n\n");
  }

  return {
    metadata,
    content: text.replace(matches?.[0] ?? "", firstPage),
  };
};