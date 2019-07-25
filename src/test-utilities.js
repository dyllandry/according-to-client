import React from 'react'
import { createMemoryHistory } from "history";
import { render } from "@testing-library/react";
import { Router } from "react-router";

export function renderWithRouter (
  ui,
  {
    route ='/',
    history = createMemoryHistory({ initialEntries: [route]})
  } = {}
) {
  return {
    ...render(<Router history={history}>{ui}</Router>),
    history
  }
}
