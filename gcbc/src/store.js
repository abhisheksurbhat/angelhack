import { createStore, applyMiddleware, compose } from "redux";
import { reducer } from "./ducks";
import createSagaMiddleware from "redux-saga";
import { ParentWatcherSaga } from "./sagas";
import { snitchMiddleware} from "@faizaanceg/snitch";

const sagaMiddleware = createSagaMiddleware();

export const store = createStore(reducer, {}, compose(applyMiddleware(sagaMiddleware, snitchMiddleware("modals"))));
sagaMiddleware.run(ParentWatcherSaga);
