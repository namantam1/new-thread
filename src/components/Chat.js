import React, { Component } from "react";
import axios from "axios";
import Message from "./Message";
import { withRouter } from "react-router-dom";

class Chat extends Component {
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
      parent: this.props.id
    };
    // console.log(data)
    axios
      .post("/api/chat", data)
      .then((response) => {
        var data = response.data;
        data = <Message key={data.id} val={data} />;
        this.state.threads.push(data);
        // console.log(this.state)
        this.setState({
            name: "",
            comment: "",
            threads: this.state.threads,
        }, () => console.log(this.state));
      })
      .catch((error) => {
        console.log(error);
      });
  };

  componentDidMount() {
    const thread = this.props.match.params.threadId;
    // console.log(thread);
    axios
      .get(`/api/chat?id=${this.props.chat.id}&thread=${thread}`)
      .then((response) => {
        // handle success
        // console.log(response.data);
        this.setState({
          threads: response.data.map((data) => (
            <Message key={data.id} val={data} />
          ))
        });
      })
      .catch(function (error) {
        // handle error
        console.log(error);
      });
  }

  render() {
    // console.log("calles render",this.state.threads)
    const DOMessage = () => this.state.threads
    return (
      <div
        style={{ border: "1px solid #ced4da", borderRadius: "5px" }}
        className="media py-3 p-2 px-3 mt-2"
      >
        <div className="media-body">
          <h5 className="my-0">{this.props.chat.username}</h5>
          <small style={{ color: "wheat" }}>{this.props.chat.time}</small>
          <br />
          <p className="mb-2 white-space">{this.props.chat.text}</p>
          <button
            className="btn btn-sm btn-success mr-2"
            type="button"
            data-toggle="collapse"
            data-target={`.multi-collapse-${this.props.chat.id}`}
            aria-expanded="false"
            aria-controls={`collapse${this.props.chat.id}`}
          >
            (3) replies
          </button>
          <a
            className="btn btn-sm btn-success"
            href={`#collapse-form-${this.props.chat.id}`}
            data-toggle="collapse"
            aria-expanded="false"
            aria-controls={`collapse${this.props.chat.id}`}
          >
            <i className="fa fa-reply" aria-hidden="true" /> Reply
          </a>
          <div
            className={`multi-collapse-${this.props.chat.id} collapse`}
            id={`collapse${this.props.chat.id}`}
          >
            <DOMessage/>
            <hr />
          </div>
          <div
            className={`collapse multi-collapse-${this.props.chat.id}`}
            id={`collapse-form-${this.props.chat.id}`}
          >
            <form onSubmit={this.submitHandler}>
              <div className="form-group mb-2" style={{ maxWidth: "500px" }}>
                <input
                  id="comment-68"
                  required
                  name="name"
                  type="text"
                  className="form-control my-2"
                  placeholder="Your Name"
                  value={this.state.name}
                  onChange={this.changeHandler}
                />
                <textarea
                  className="form-control"
                  name="comment"
                  rows={2}
                  placeholder="Reply to this query"
                  required
                  value={this.state.comment}
                  onChange={this.changeHandler}
                />
              </div>
              <input type="hidden" name="id" defaultValue={68} />
              <input
                className="btn btn-sm btn-dark mb-2 ml-2"
                type="submit"
                defaultValue="Reply"
              />
            </form>
          </div>
        </div>
      </div>
    );
  }
}

export default withRouter(Chat);
