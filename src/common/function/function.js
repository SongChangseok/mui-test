export const deleteHyphen = function (data = "") {
  return data.replace(/-/gi, "");
};

export const formatCellphone = function (data = "") {
  return data.replace(
    /(^02.{0}|^01.{1}|[0-9]{3})([0-9]+)([0-9]{4})/,
    "$1-$2-$3"
  );
};
