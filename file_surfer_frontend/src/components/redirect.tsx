
import { Component } from 'preact';
import { route } from 'preact-router';
import { useEffect } from 'preact/hooks';

export const Redirect: preact.FunctionalComponent<{ to: string }> = ({ to }) => {
  useEffect(() => {
    route(to, true)
  }, [])

  return <></>
}