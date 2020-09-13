import React, { Component } from "react";
import axios from "axios";
import Chat from "./Chat";
import { withRouter } from "react-router-dom";

class ThreadChat extends Component {
  constructor(props) {
    super(props);

    this.state = {
      userId: 1,
      threads: [],
      name: "",
      comment: "",
    };
  }

  changeHandler = (e) => {
    this.setState({ [e.target.name]: e.target.value });
  };

  submitHandler = (e) => {
    const thread = this.props.match.params.threadId;
    e.preventDefault();
    // console.log(this.state, e)
    var data = {
      text: this.state.comment,
      user: this.state.userId,
      thread: thread,
      name: this.state.name,
    };
    // console.log(data)
    axios
      .post("/api/chat", data)
      .then((response) => {
        var data = response.data;
        data = <Chat key={data.id} chat={data} id={data.id} />;
        this.state.threads.unshift(data);
        this.setState((pre) => {
          return {
            name: "",
            comment: "",
            threads: pre.threads,
          };
        });
        // console.log("this is new state", this.state);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  componentDidMount() {
    const thread = this.props.match.params.threadId;
    //   console.log(thread)
    axios
      .get(`/api/chat?thread=${thread}`)
      .then((response) => {
        // handle success
        // console.log(response.data);
        this.setState({
          threads: response.data
            .reverse()
            .map((data) => <Chat key={data.id} chat={data} id={data.id} />),
        });
      })
      .catch(function (error) {
        // handle error
        console.log(error);
      });
  }

  render() {
    const { threads, name, comment } = this.state;
    return (
      <div className="container text-break pb-5">
        <h3>Feedbacks (16) | Answered (49)</h3>
        <form onSubmit={this.submitHandler}>
          <div className="form-group mb-2" style={{ maxWidth: "500px" }}>
            <input
              required
              name="name"
              type="text"
              className="form-control my-2"
              placeholder="Your Name"
              value={name}
              onChange={this.changeHandler}
            />
            <textarea
              className="form-control my-2"
              name="comment"
              rows={3}
              placeholder="Write your query here"
              required
              value={comment}
              onChange={this.changeHandler}
            />
          </div>
          <input
            className="btn btn-primary btn-sm mb-4"
            type="submit"
            defaultValue="submit"
          />
        </form>
        <div>{threads}</div>
      </div>
    );
  }
}

export default withRouter(ThreadChat);
