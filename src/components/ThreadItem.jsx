import React, { useContext, useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import parse from 'html-react-parser';
import ThemeContext from '../contexts/ThemeContext';
import LanguageContext, { translations } from '../contexts/LanguageContext';
import { FiMessageSquare } from 'react-icons/fi';
import { TbArrowBigUp, TbArrowBigDown } from 'react-icons/tb';
import PropTypes from 'prop-types';
import { postedAt } from '../utils';
import { setAuthModalActionCreator } from '../states/authModal/action';
import { asyncPopulateThreads } from '../states/shared/action';
import {
  asyncUpVoteThread,
  asyncDownVoteThread,
  asyncNeutralVoteThread,
  asyncAddComment,
  asyncUpVoteComment,
  asyncDownVoteComment,
  asyncNeutralVoteComment,
} from '../states/threads/action';
import { IoIosSend } from 'react-icons/io';
import BtnMotion from './BtnMotion';
function ThreadItem({
  id,
  body,
  createdAt,
  title,
  totalComments,
  upVotesBy,
  downVotesBy,
  category,
  comments = [],
  user,
}) {
  const authUser = useSelector((states) => states.authUser);
  const dispatch = useDispatch();
  const [showComments, setShowComments] = useState(false);
  const { theme } = useContext(ThemeContext);
  const { language } = useContext(LanguageContext);
  const [t, setT] = useState(translations[language] || translations.id);
  const [upVote, setUpVote] = useState(false);
  const [downVote, setDownVote] = useState(false);
  const [upVoteTotal, setUpVoteTotal] = useState(upVotesBy.length);
  const [downVoteTotal, setDownVoteTotal] = useState(downVotesBy.length);
  const [disableVote, setDisableVote] = useState(true);
  const [commentContent, setCommentContent] = useState('');
  const [isSubmittingComment, setIsSubmittingComment] = useState(false);

  useEffect(() => {
    // Check initial vote state when component mounts
    if (authUser && authUser.id) {
      setUpVote(upVotesBy.includes(authUser.id));
      setDownVote(downVotesBy.includes(authUser.id));
    }
    setDisableVote(false);
  }, [authUser, upVotesBy, downVotesBy]);

  const handleCommentChange = (e) => {
    setCommentContent(e.target.value);
  };

  const handleCommentSubmit = () => {
    if (!commentContent.trim()) return;

    setIsSubmittingComment(true);
    dispatch(asyncAddComment(id, commentContent))
      .then(() => {
        setCommentContent('');
      })
      .finally(() => {
        setIsSubmittingComment(false);
      });
    dispatch(asyncPopulateThreads());
  };
  // Update handleUpvote and handleDownvote functions
  const handleUpvote = () => {
    if (!authUser) {
      dispatch(setAuthModalActionCreator(true));
      return;
    }

    if (upVote) {
      // If already upvoted, neutralize the vote
      dispatch(asyncNeutralVoteThread(id, authUser));
      setUpVote(false);
      setUpVoteTotal(upVoteTotal - 1);
    } else {
      // If not upvoted, upvote and remove downvote if exists
      dispatch(asyncUpVoteThread(id, authUser));
      setUpVote(true);
      setUpVoteTotal(upVoteTotal + 1);
      if (downVote) {
        setDownVote(false);
        setDownVoteTotal(downVoteTotal - 1);
      }
    }
    dispatch(asyncPopulateThreads());
  };

  const handleDownvote = () => {
    if (!authUser) {
      dispatch(setAuthModalActionCreator(true));
      return;
    }

    if (downVote) {
      // If already downvoted, neutralize the vote
      dispatch(asyncNeutralVoteThread(id, authUser));
      setDownVote(false);
      setDownVoteTotal(downVoteTotal - 1);
    } else {
      // If not downvoted, downvote and remove upvote if exists
      dispatch(asyncDownVoteThread(id, authUser));
      setDownVote(true);
      setDownVoteTotal(downVoteTotal + 1);
      if (upVote) {
        setUpVote(false);
        setUpVoteTotal(upVoteTotal - 1);
      }
    }
    dispatch(asyncPopulateThreads());
  };
  // Update handleUpvote and handleDownvote comment functions
  const handleCommentUpvote = (commentId, isUpvoted) => {
    if (!authUser) {
      dispatch(setAuthModalActionCreator(true));
      return;
    }
    if (isUpvoted) {
      dispatch(asyncNeutralVoteComment(id, commentId, authUser));
    } else {
      dispatch(asyncUpVoteComment(id, commentId, authUser));
    }
    dispatch(asyncPopulateThreads());
  };

  const handleCommentDownvote = (commentId, isDownvoted) => {
    if (!authUser) {
      dispatch(setAuthModalActionCreator(true));
      return;
    }
    if (isDownvoted) {
      dispatch(asyncNeutralVoteComment(id, commentId));
    } else {
      dispatch(asyncDownVoteComment(id, commentId));
    }
    dispatch(asyncPopulateThreads());
  };
  useEffect(() => {
    setT(translations[language] || translations.id);
  }, [language]);
  const cardClass =
    theme === 'dark' ? 'bg-secondary bg-opacity-25 text-light' : 'bg-white text-dark';
  const cardCommentsClass =
    theme === 'dark'
      ? 'bg-secondary bg-opacity-25 text-light'
      : 'bg-secondary bg-opacity-25 text-dark';
  const upVoteClass =
    theme === 'dark'
      ? upVote
        ? ' bg-primary bg-opacity-25 text-primary'
        : 'bg-secondary bg-opacity-25 text-light'
      : upVote
        ? ' bg-primary bg-opacity-25 text-primary'
        : 'bg-secondary bg-opacity-25 text-dark';
  const downVoteClass =
    theme === 'dark'
      ? downVote
        ? ' bg-danger bg-opacity-25 text-danger'
        : 'bg-secondary bg-opacity-25 text-light'
      : downVote
        ? ' bg-danger bg-opacity-25 text-danger'
        : 'bg-secondary bg-opacity-25 text-dark';
  const navLinkClass =
    theme === 'dark'
      ? 'bg-secondary bg-opacity-25 text-light'
      : 'bg-secondary bg-opacity-25 text-dark';
  const { avatar, name, email } = user;

  const isString = (isiBody) => isiBody.search('<div>|<pre>|<p>|<b>|<br>|<i>|<blockquote>');

  const handleShowComment = () => {
    // Toggle comment visibility
    setShowComments(!showComments);
  };

  return (
    <div className={`p-0 ${cardClass} border-0 rounded-2`}>
      <div className="card-body p-3">
        <div className="d-flex align-items-center mb-3">
          <div className="flex-shrink-0">
            <img
              className="rounded-circle"
              src={avatar}
              alt={id}
              title={name}
              style={{ height: '36px' }}
            />
          </div>
          <div className="flex-grow-1 ms-3">
            <h5 className="card-title ms-2 mb-0">{name}</h5>
            <h6 className="card-subtitle ms-2 mb-0 text-secondary">
              {email} • {postedAt(createdAt)}
            </h6>
          </div>
        </div>

        <h5 className="card-title">{title}</h5>
        {isString(body) === -1 ? (
          <p className="card-text">{body}</p>
        ) : (
          <div className="card-text">{parse(body)}</div>
        )}
        <div className="mb-2">
          {category.split(',').map((cat, index) => (
            <span
              key={index}
              className={`badge me-1 bg-opacity-50 ${
                theme === 'dark' ? 'bg-info text-dark' : 'bg-primary'
              }`}
            >
              {cat.trim()}
            </span>
          ))}
        </div>
        <div className="btn-group" role="group" aria-label="React Actions">
          <BtnMotion
            onClick={handleUpvote}
            className={`btn d-flex align-items-center gap-2 ${upVoteClass}`}
          >
            <TbArrowBigUp /> {t.upvote} • {upVoteTotal}
          </BtnMotion>
          <BtnMotion
            onClick={handleDownvote}
            className={`btn d-flex align-items-center gap-2 ${downVoteClass}`}
            disabled={disableVote}
          >
            <TbArrowBigDown /> {t.downvote} • {downVoteTotal}
          </BtnMotion>
          <BtnMotion
            onClick={handleShowComment}
            className={`btn d-flex align-items-center gap-2 ${navLinkClass}`}
            disabled={disableVote}
          >
            <FiMessageSquare /> : {totalComments}
          </BtnMotion>
        </div>
      </div>
      {/* Comments Section */}
      {showComments && (
        <div className={`card p-3 ${cardCommentsClass} border-0`}>
          <p>Details</p>
          <div className="mb-3 d-flex align-items-center gap-2">
            {authUser ? (
              <>
                <div className="flex-shrink-0">
                  <img
                    className="rounded-circle"
                    src={authUser.avatar}
                    alt={authUser.name}
                    style={{ height: '36px' }}
                  />
                </div>
                <div className="flex-grow-1">
                  <div className="input-group">
                    <input
                      type="text"
                      className={`border-0 form-control ${
                        theme === 'dark' ? 'bg-secondary bg-opacity-25 text-light' : ''
                      }`}
                      placeholder={t.addComment}
                      aria-label="Add comment"
                      value={commentContent}
                      onChange={handleCommentChange}
                    />
                    <BtnMotion
                      className={`border-0 btn ${theme === 'dark' ? 'btn-light' : 'btn-dark'}`}
                      type="button"
                      onClick={handleCommentSubmit}
                      disabled={isSubmittingComment || !commentContent.trim()}
                    >
                      <IoIosSend />
                    </BtnMotion>
                  </div>
                </div>
              </>
            ) : (
              <p className="text-secondary mb-0">{t.loginToComment}</p>
            )}
          </div>
          {comments && comments.length > 0 ? (
            comments.map((comment) => (
              <div key={comment.id} className="mb-2 p-3">
                <div className="d-flex align-items-center mb-2">
                  <div className="flex-shrink-0">
                    <img
                      className="rounded-circle"
                      src={comment.owner.avatar}
                      alt={comment.owner.name}
                      style={{ height: '25px' }}
                    />
                  </div>
                  <div className="flex-grow-1 ms-2">
                    <h6 className="mb-0">{comment.owner.name}</h6>
                    <small className="text-secondary">{postedAt(comment.createdAt)}</small>
                  </div>
                </div>
                <div className="card-text">
                  {isString(comment.content) === -1 ? comment.content : parse(comment.content)}
                </div>
                <div className="d-flex mt-2">
                  <BtnMotion
                    className={`btn btn-sm me-2 bg-opacity-25 ${
                      theme === 'dark'
                        ? comment.upVotesBy.includes(authUser?.id)
                          ? ' bg-primary text-primary'
                          : 'bg-secondary text-light'
                        : comment.upVotesBy.includes(authUser?.id)
                          ? ' bg-primary text-primary'
                          : 'bg-secondary text-dark'
                    }`}
                    onClick={() =>
                      handleCommentUpvote(comment.id, comment.upVotesBy.includes(authUser?.id))
                    }
                  >
                    <TbArrowBigUp /> {comment.upVotesBy.length}
                  </BtnMotion>
                  <BtnMotion
                    className={`btn btn-sm ${navLinkClass}${
                      theme === 'dark'
                        ? comment.downVotesBy.includes(authUser?.id)
                          ? ' bg-danger text-danger'
                          : 'bg-secondary text-light'
                        : comment.downVotesBy.includes(authUser?.id)
                          ? ' bg-danger text-danger'
                          : 'bg-secondary text-dark'
                    }`}
                    onClick={() =>
                      handleCommentDownvote(comment.id, comment.downVotesBy.includes(authUser?.id))
                    }
                  >
                    <TbArrowBigDown /> {comment.downVotesBy.length}
                  </BtnMotion>
                </div>
              </div>
            ))
          ) : (
            <p className="text-secondary">{t.noComments}</p>
          )}
        </div>
      )}
    </div>
  );
}

const userShape = {
  name: PropTypes.string.isRequired,
  avatar: PropTypes.string.isRequired,
};

const commentShape = PropTypes.shape({
  id: PropTypes.string.isRequired,
  content: PropTypes.string.isRequired,
  createdAt: PropTypes.string.isRequired,
  owner: PropTypes.shape(userShape).isRequired,
  upVotesBy: PropTypes.array.isRequired,
  downVotesBy: PropTypes.array.isRequired,
});

const threadItemShape = {
  id: PropTypes.string.isRequired,
  body: PropTypes.string.isRequired,
  createdAt: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  totalComments: PropTypes.number.isRequired,
  comments: PropTypes.arrayOf(commentShape),
  user: PropTypes.shape(userShape).isRequired,
};

ThreadItem.propTypes = {
  ...threadItemShape,
};

export { threadItemShape };

export default ThreadItem;
