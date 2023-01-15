
import { FunctionalComponent } from 'preact';
import { route } from 'preact-router';
import { useEffect } from 'preact/hooks';

export const Redirect: FunctionalComponent<{ to: string }> = ({ to }) => {
  useEffect(() => {
    route(to, true)
  }, [])

  return <></>
}