import React, {useState} from "react";
import ThreadChat from "./ThreadChat";
import { Switch, Route, useRouteMatch,  useHistory, withRouter } from "react-router-dom";

function Thread() {
  var [thread, threadChange] = useState("")
  let { path, url } = useRouteMatch();
  let history = useHistory()

  function ThreadSubmit(e){
    e.preventDefault()
    console.log("Form submit", thread)
    history.push(`${url}/${thread}`)
    threadChange("")
  }
  return (
    <Switch>
      <Route exact path={path}>
        <div className="container text-center">
          <form onSubmit={ThreadSubmit}>
            <div className="form-group mx-sm-3 mb-2">
              <input
                required
                type="text"
                className="form-control"
                id="thread"
                name="thread"
                value={thread}
                placeholder="Thread Name"
                onChange={(e) => threadChange(e.target.value)}
              />
            </div>
            <button type="submit" className="btn btn-sm btn-primary mb-2 mr-2">
              search
            </button>
            <button
              className="btn btn-sm btn-danger mb-2 clear"
            >
              clear
            </button>
          </form>
        </div>
      </Route>
      <Route path={`${path}/:threadId`}>
        <ThreadChat />
      </Route>
    </Switch>
  );
}

export default withRouter(Thread);
