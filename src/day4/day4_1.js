const PARSE_DATA = /^(?<data>(?:[a-zA-Z]+-)+)(?<sector>[0-9]+)\[(?<checksum>(?<=\[)[a-zA-Z]{5}(?=\]))/gm; // /(?<data>[a-zA-Z0-9-]+)(?<sector>(?<=-)[0-9]+)\[(?<checksum>(?<=\[)[a-zA-Z]{5}(?=\]))/g;
const INVALID_NAME_CHARS = /[^a-zA-Z]*/g;

export const getSectorData = (inputStr) => {
  const dataArray = inputStr.matchAll(PARSE_DATA);
  return [...dataArray].map((match) => ({
    ...match.groups,
    data: match.groups.data.replace(INVALID_NAME_CHARS, ''),
  }));
};
