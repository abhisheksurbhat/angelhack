import { projectsSagas } from "./components/projects/sagas";
import { all } from "redux-saga/effects";

const saga = [
    ...projectsSagas
];

export function* ParentWatcherSaga()
{
    yield all(saga);
}

