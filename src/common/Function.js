export const deleteHyphen = (data = "") => data.replace(/-/gi, "");

export const formatCellphone = (data = "") =>
  data.replace(/(^02.{0}|^01.{1}|[0-9]{3})([0-9]+)([0-9]{4})/, "$1-$2-$3");

export const splitCellphone = (data = "") => data.split("-");
