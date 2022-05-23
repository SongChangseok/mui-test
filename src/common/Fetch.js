import React, { useEffect, useState } from "react";
import { useMountedRef } from "../common/hooks/CustomHooks";
import { BackdropLoading } from "./Loading";

function useFetch(url, { method = "POST", body = {}, headers }) {
  const [data, setData] = useState();
  const [error, setError] = useState();
  const [loading, setLoading] = useState(true);
  const mounted = useMountedRef();

  useEffect(() => {
    if (!url) return;
    if (!mounted.current) return;
    console.log("run", url);
    fetch(url, {
      method,
      headers: {
        ...headers,
        "Content-Type": "application/json; charset=utf-8",
      },
      body: JSON.stringify(body),
    })
      .then((data) => {
        if (!mounted.current) throw new Error("component is not mounted");
        return data;
      })
      .then((data) => data.json())
      .then(setData)
      .then(() => setLoading(false))
      .catch((error) => {
        if (!mounted.current) return;
        setError(error);
      });
  }, [url]);

  return {
    loading,
    data,
    error,
  };
}

export function Fetch({
  url,
  req = {},
  renderSuccess,
  loadingFallback = <BackdropLoading open={true} />,
  renderError = (error) => <pre>{JSON.stringify(error, null, 2)}</pre>,
}) {
  console.log("Fetch", url);
  const { loading, data, error } = useFetch(url, req);
  if (loading) return loadingFallback;
  if (error) return renderError(error);
  if (data) return renderSuccess({ data });
}

export async function requestData(
  url,
  { method = "POST", body = {}, headers }
) {
  const result = await fetch(url, {
    method,
    headers: {
      ...headers,
      "Content-Type": "application/json; charset=utf-8",
    },
    body: JSON.stringify(body),
  });

  // 삭제 예정 start
  if (result.redirected) {
    // const domain = `${window.location.protocol}//${window.location.host}`;
    // const uri = result.url.replace(domain, "");
    // return (location.href = uri);
    console.log(result.url);
    return result.url;
  }
  // 삭제 예정 end

  if (result.ok) return result.json();

  return {
    success: false,
    message: "failure",
    data: "서버 통신 중 오류가 발생했습니다.",
  };
}
