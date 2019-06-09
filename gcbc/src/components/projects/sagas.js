import { takeEvery, put, select, take } from "redux-saga/effects";
import { actionType, actions } from "./ducks";
import { api } from "../../api";
import isSuccess from "../../utils";
import { yieldExpression } from "@babel/types";

export const projectsSagas = [
  takeEvery(actionType.GET_BUYER_ORDER, onGetBuyerOrder),
  takeEvery(actionType.GET_SELLER_ORDER, onGetSellerOrder),
  takeEvery(actionType.GET_CONTRACTS, onGetContracts),
  takeEvery(actionType.GET_ACTIVE_PROJECTS, getProjects),
  takeEvery(actionType.GET_COMPLETED_PROJECTS, getProjects),
  takeEvery(actionType.GET_BID_PROJECTS, getProjects),
  takeEvery(actionType.ADD_PROJECT, addProject),
  takeEvery(actionType.GET_BID_FOR_RESELLERS, getBidForResellers),
  takeEvery(actionType.GET_PROJECTS_COUNT, getProjectsCount),
  takeEvery(actionType.SUBMIT_BID, submitBid),
  takeEvery(actionType.POST_FEEDBACK, postFeedback),
  takeEvery(actionType.GET_PROJECT_BY_ID, getProjectById),
  takeEvery(actionType.GET_BIDS_BY_PROJECT_ID, getBidsByProjectId),
  takeEvery(actionType.ACCEPT_BID, acceptBid),
  takeEvery(actionType.MARK_PROJECT_AS_COMPLETED, markProjectAsCompleted),
  takeEvery(actionType.SET_PROJECT_NEXT_STATE, setProjectNextState)
];

function* onCreateQuotation(action) {
  const response = yield api.put("/gcbc/", {});
}

function* onGetBuyerOrder(action) {
  const response = yield api.get("/gcbc/buyers");
  try {
    yield put({ type: isSuccess(actionType.GET_BUYER_ORDER), response });
  } catch (error) {
    console.log("a error has occurred ", error);
  }
}

function* onGetSellerOrder(action) {
  const response = yield api.get("/gcbc/sellers");
  try {
    yield put({ type: isSuccess(actionType.GET_SELLER_ORDER), response });
  } catch (error) {
    console.log("a error has occurred ", error);
  }
}

function* onGetContracts(action) {
  const response = yield api.get("/gcbc/contracts");
  try {
    yield put({ type: isSuccess(actionType.GET_CONTRACTS), response });
  } catch (error) {
    console.log("a error has occurred ", error);
  }
}

function* addProject(action) {
  const {
    payload: { title, description }
  } = action;
  const apiCall = "/repl/projects";
  try {
    const response = yield api.put(apiCall, {
      name: title,
      description,
      customer_id: 1
    });
    yield put({ type: isSuccess(actionType.ADD_PROJECT), response });
  } catch (error) {
    console.log("Exception while adding bid", error);
  }
}

function* getProjectsCount() {
  const apiCall =
    process.env.REACT_APP_USER === "reseller"
      ? `/repl/resellers/${process.env.REACT_APP_RESELLER}/projects/stats`
      : "/repl/customers/1/projects/stats";
  try {
    const response = yield api.get(apiCall);
    yield put({ type: isSuccess(actionType.GET_PROJECTS_COUNT), response });
  } catch (error) {
    console.log("Error while fetching projects count", error);
  }
}

function* getBidForResellers(action) {
  const {
    payload: { type }
  } = action;
  const apiCall = "/repl/projects";
  try {
    const response = yield api.get(apiCall, { type });
    yield put({ type: isSuccess(actionType.GET_BID_FOR_RESELLERS), response });
  } catch (error) {
    console.log("Error while fetching Bids for resellers", error);
  }
}

function* getProjects(action) {
  try {
    const {
      payload: { type }
    } = action;
    const apiCall =
      process.env.REACT_APP_USER === "reseller"
        ? `/repl/resellers/${
            process.env.REACT_APP_RESELLER
          }/projects?type=${type}`
        : `/repl/customers/1/projects?type=${type}`;

    let response = yield api.get(apiCall);
    yield put({
      type: isSuccess(actionType.GET_PROJECTS),
      response: { response, type }
    });
    // }
  } catch (error) {
    console.error("Exception while fetching projects", error);
  }
}

function* postFeedback(action) {
  const {
    payload: {
      rating,
      remarks,
      projectId,
      customer_id: customerId,
      reseller_id
    }
  } = action;
  const apiCall = `/repl/resellers/${reseller_id}/ratings`;
  try {
    yield api.put(apiCall, {
      customerId,
      rating,
      remarks,
      projectId
    });
  } catch (error) {
    console.log("Error while posting feedback", error);
  }
}

function* submitBid(action) {
  try {
    let bidData = yield api.put(`/repl/bids`, action.payload);
    yield put(actions.submitBidSuccess(bidData));
  } catch (error) {
    console.error("Exception in education sagas", error);
  }
}

function* getProjectById(action) {
  try {
    let projectData = yield api.get(
      `/repl/projects/${action.payload.projectId}`
    );
    yield put(actions.getProjectByIdSuccess(projectData));
  } catch (error) {
    console.error("Exception in education sagas", error);
  }
}

function* getBidsByProjectId(action) {
  try {
    let bidData = yield api.get(`/repl/bids/${action.payload.projectId}`);
    let formattedBidData = [...bidData];
    for (let i = 0; i < bidData.length; i++) {
      const { reseller_id } = bidData[i];
      let apiCall = `/repl/resellers/${reseller_id}/ratings`;
      let ratingResponse = yield api.get(apiCall);
      let { rating, name } = ratingResponse || {};
      rating = rating === "NaN" ? "Never Rated" : rating;
      formattedBidData[i] = { ...formattedBidData[i], rating, name };
    }
    yield put(actions.getBidsByProjectIdSuccess(formattedBidData));
  } catch (error) {
    console.error("Exception in getBidsByProjectId sagas", error);
  }
}

function* acceptBid(action) {
  try {
    let updatedBidData = yield api.post(
      `/repl/projects/${action.payload.projectId}`,
      {
        bidId: action.payload.bidId,
        status: action.payload.status
      }
    );
    yield put(
      actions.acceptBidSuccess({
        ...updatedBidData,
        bidId: action.payload.bidId
      })
    );
  } catch (error) {
    console.error("Exception in acceptBid sagas", error);
  }
}

function* markProjectAsCompleted(action) {
  try {
    let updatedProjectData = yield api.post(
      `repl/projects/${action.payload.projectId}`,
      { status: action.payload.status }
    );
    yield put(
      actions.markProjectAsCompletedSuccess({
        ...updatedProjectData,
        projectId: action.payload.projectId
      })
    );
  } catch (error) {
    console.error("Exception in markProjectAsCompleted sagas", error);
  }
}

function* setProjectNextState(action) {
  try {
    // console.log("setProjectNextState",action);
    let updatedProjectstate = yield api.post(
      `repl/projects/${action.payload.projectId}/next`,
      {
        phase: action.payload.currentStep
      }
    );
    // let updatedProjectstate = {currentStep: action.payload.currentStep>=5 ? 5 : action.payload.currentStep+1};
    console.log("updatedProjectstate", updatedProjectstate);
    yield put(
      actions.setProjectNextStateSuccess({
        ...updatedProjectstate,
        projectId: action.payload.projectId
      })
    );
  } catch (error) {}
}
