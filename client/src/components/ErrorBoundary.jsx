import React from 'react';

export default function ErrorBoundary(props) {
  try {
    console.log(props.children)
  } catch (error) {
    return <Error error={error} />
  }

  return props.children;
}

function Error({ state }) {
  console.log(state)
  return (
    <div>error</div>
  )
}
