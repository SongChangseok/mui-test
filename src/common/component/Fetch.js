import React, { useEffect, useState } from "react";
import { useMountedRef } from "../../hooks/customHooks";
import { BackdropLoading } from "./Loading";

export function useFetch(uri, { method = "POST", body = {} }) {
  const [data, setData] = useState();
  const [error, setError] = useState();
  const [loading, setLoading] = useState(true);
  const mounted = useMountedRef();

  useEffect(() => {
    if (!uri) return;
    if (!mounted.current) return;
    console.log("run", uri);
    fetch(uri, {
      method,
      headers: {
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
  }, [uri]);

  return {
    loading,
    data,
    error,
  };
}

export function Fetch({
  uri,
  req = {},
  renderSuccess,
  loadingFallback = <BackdropLoading open={true} />,
  renderError = (error) => <pre>{JSON.stringify(error, null, 2)}</pre>,
}) {
  console.log("Fetch", uri);
  const { loading, data, error } = useFetch(uri, req);
  if (loading) return loadingFallback;
  if (error) return renderError(error);
  if (data) return renderSuccess({ data });
}
