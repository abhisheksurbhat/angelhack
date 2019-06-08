import isSuccess from "../../utils";

const initialState = {
  active: [],
  completed: [],
  bid: [],
  projectCounts: [],
  resellerBid: [],
  resellerId: process.env.REACT_APP_RESELLER,
  project: {
    bids: []
  }
};

export const actionType = {
  SUBMIT_BID: "Submit Bid",
  GET_ACTIVE_PROJECTS: "GET active projects",
  GET_COMPLETED_PROJECTS: "GET completed Projects",
  GET_BID_PROJECTS: "GET Bid Projects",
  GET_PROJECTS: "GET Projects",
  ADD_PROJECT: "Add Bid",
  GET_BID_FOR_RESELLERS: "Get bids for resellers",
  GET_PROJECTS_COUNT: "Get projects count",
  POST_FEEDBACK: "Post feedback",
  GET_PROJECT_BY_ID: "Get Project By Id",
  GET_BIDS_BY_PROJECT_ID: "Get Bids By Project Id",
  ACCEPT_BID: "Accept Bid",
  MARK_PROJECT_AS_COMPLETED: "Mark Project As Completed",
  SET_PROJECT_NEXT_STATE: "Set Project Next State"
};

export const actions = {
  submitBid: payload => {
    return {
      type: actionType.SUBMIT_BID,
      payload
    };
  },
  submitBidSuccess: payload => {
    return {
      type: isSuccess(actionType.SUBMIT_BID),
      payload
    };
  },
  getActiveProjects: payload => {
    return {
      type: actionType.GET_ACTIVE_PROJECTS,
      payload
    };
  },
  getCompletedProjects: payload => ({
    type: actionType.GET_COMPLETED_PROJECTS,
    payload
  }),
  getBidProjects: payload => ({
    type: actionType.GET_BID_PROJECTS,
    payload
  }),
  addProject: payload => ({
    type: actionType.ADD_PROJECT,
    payload
  }),
  getBidForResellers: payload => ({
    type: actionType.GET_BID_FOR_RESELLERS,
    payload
  }),
  getProjectsCount: () => ({
    type: actionType.GET_PROJECTS_COUNT
  }),
  postFeedback: payload => ({
    type: actionType.POST_FEEDBACK,
    payload
  }),
  getProjectById: payload => ({
    type: actionType.GET_PROJECT_BY_ID,
    payload
  }),
  getProjectByIdSuccess: payload => ({
    type: isSuccess(actionType.GET_PROJECT_BY_ID),
    payload
  }),
  getBidsByProjectId: payload => ({
    type: actionType.GET_BIDS_BY_PROJECT_ID,
    payload
  }),
  getBidsByProjectIdSuccess: payload => ({
    type: isSuccess(actionType.GET_BIDS_BY_PROJECT_ID),
    payload
  }),
  acceptBid: payload => ({
    type: actionType.ACCEPT_BID,
    payload
  }),
  acceptBidSuccess: payload => ({
    type: isSuccess(actionType.ACCEPT_BID),
    payload
  }),
  markProjectAsCompleted: payload => ({
    type: actionType.MARK_PROJECT_AS_COMPLETED,
    payload
  }),
  markProjectAsCompletedSuccess: payload => ({
    type: isSuccess(actionType.MARK_PROJECT_AS_COMPLETED),
    payload
  }),
  setProjectNextState: payload => ({
    type: actionType.SET_PROJECT_NEXT_STATE,
    payload
  }),
  setProjectNextStateSuccess: payload => ({
    type: isSuccess(actionType.SET_PROJECT_NEXT_STATE),
    payload
  })
};

export function projectsReducer(state = initialState, action) {
  switch (action.type) {
    case isSuccess(actionType.GET_PROJECTS):
      let {
        response: { type, response }
      } = action;
      response = response.map(item => {
        return {
          ...item,
          suggestions: getProductRecommendation(item.description)
        };
      });
      return {
        ...state,
        [type]: response
      };
    case isSuccess(actionType.ADD_PROJECT):
      return {
        ...state,
        bid: [...state.bid, action.response]
      };
    case isSuccess(actionType.GET_PROJECTS_COUNT):
      return {
        ...state,
        projectCounts: action.response
      };
    case isSuccess(actionType.GET_BID_FOR_RESELLERS):
      let responseForReseller = action.response.map(item => {
        return {
          ...item,
          suggestions: getProductRecommendation(item.description)
        };
      });
      return {
        ...state,
        resellerBid: responseForReseller
      };
    case isSuccess(actionType.GET_PROJECT_BY_ID):
      return {
        ...state,
        project: {
          ...state.project,
          ...action.payload
        }
      };
    case isSuccess(actionType.GET_BIDS_BY_PROJECT_ID):
      return {
        ...state,
        project: {
          ...state.project,
          bids: action.payload
        }
      };
    case isSuccess(actionType.ACCEPT_BID):
      let updatedBids = [];
      for (let [index, val] of state.project.bids.entries()) {
        if (val.id === action.payload.bidId) {
          updatedBids.push({
            ...val,
            status: "active"
          });
        } else {
          updatedBids.push(val);
        }
      }
      let updatedProjectArray = [];
      for (let [index, ele] of state.bid.entries()) {
        if (ele.id !== action.payload.id) {
          updatedProjectArray.push(ele);
        }
      }
      state.bid.find((ele, index) => ele.id === action.payload.id);
      return {
        ...state,
        project: {
          ...state.project,
          bids: updatedBids
        },
        bid: updatedProjectArray
      };
    case isSuccess(actionType.MARK_PROJECT_AS_COMPLETED):
      let updatedActiveBids = [];
      for (let [index, val] of state.active.entries()) {
        if (val.id !== action.payload.projectId) {
          updatedActiveBids.push(val);
        }
      }
      return {
        ...state,
        active: updatedActiveBids
      };
    case isSuccess(actionType.SET_PROJECT_NEXT_STATE):
      let updatedActiveProjects = [];
      //console.log("CURR SATTE", state.active);
      for (let [index, val] of state.active.entries()) {
        if (val.id === action.payload.projectId) {
          updatedActiveProjects.push({
            ...val,
            phase: action.payload.phase
          });
        } else {
          updatedActiveProjects.push(val);
        }
      }
      //console.log("NEXT SATTE", updatedActiveProjects)
      return {
        ...state,
        active: updatedActiveProjects
      };

    default:
      return state;
  }
}

const mapping = [
  ["email", "E-Mail"],
  ["e-mail", "E-Mail"],
  ["hosting", "Hosting Product"],
  ["host", "Hosting Product"]
];

const productMap = new Map(mapping);

function getProductRecommendation(description) {
  let words = description.split(" ");
  let recommedations = [];

  words.forEach(word => {
    let recommedation = productMap.get(word.toLowerCase());
    if (recommedation) recommedations.push(recommedation);
  });
  return recommedations;
}
