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
    theme === 'dark' ? 'modern-card-dark text-light' : 'modern-card text-dark';
  const cardCommentsClass =
    theme === 'dark'
      ? 'bg-dark bg-opacity-50 text-light'
      : 'bg-light text-dark';
  const upVoteClass =
    theme === 'dark'
      ? upVote
        ? 'bg-primary bg-opacity-25 text-primary border-primary'
        : 'bg-secondary bg-opacity-25 text-light border-secondary'
      : upVote
        ? 'bg-primary bg-opacity-25 text-primary border-primary'
        : 'bg-light text-dark border-light';
  const downVoteClass =
    theme === 'dark'
      ? downVote
        ? 'bg-danger bg-opacity-25 text-danger border-danger'
        : 'bg-secondary bg-opacity-25 text-light border-secondary'
      : downVote
        ? 'bg-danger bg-opacity-25 text-danger border-danger'
        : 'bg-light text-dark border-light';
  const navLinkClass =
    theme === 'dark'
      ? 'bg-secondary bg-opacity-25 text-light border-secondary'
      : 'bg-light text-dark border-light';
  const { avatar, name, email } = user;

  const isString = (isiBody) => isiBody.search('<div>|<pre>|<p>|<b>|<br>|<i>|<blockquote>');

  const handleShowComment = () => {
    // Toggle comment visibility
    setShowComments(!showComments);
  };

  return (
    <div className={`card border-0 ${cardClass} mb-0`}>
      <div className="card-body p-4">
        {/* User Info Header */}
        <div className="d-flex align-items-center mb-3">
          <div className="flex-shrink-0">
            <img
              className="rounded-circle avatar-md"
              src={avatar}
              alt={id}
              title={name}
            />
          </div>
          <div className="flex-grow-1 ms-3">
            <h6 className="mb-0 fw-bold">{name}</h6>
            <small className={theme === 'dark' ? 'text-light opacity-75' : 'text-muted'}>
              {postedAt(createdAt)}
            </small>
          </div>
        </div>

        {/* Content */}
        <h5 className="card-title fw-bold mb-2">{title}</h5>
        {isString(body) === -1 ? (
          <p className="card-text mb-3">{body}</p>
        ) : (
          <div className="card-text mb-3">{parse(body)}</div>
        )}
        
        {/* Tags/Categories */}
        <div className="mb-3">
          {category.split(',').map((cat, index) => (
            <span
              key={index}
              className={`badge badge-modern me-2 ${
                theme === 'dark' ? 'bg-info bg-opacity-25 text-info' : 'bg-primary bg-opacity-10 text-primary'
              }`}
            >
              #{cat.trim()}
            </span>
          ))}
        </div>
        
        {/* Action Buttons */}
        <div className="d-flex gap-2 flex-wrap" role="group" aria-label="React Actions">
          <BtnMotion
            onClick={handleUpvote}
            className={`btn btn-sm d-flex align-items-center gap-2 ${upVoteClass}`}
          >
            <TbArrowBigUp size={20} /> <span className="fw-semibold">{upVoteTotal}</span>
          </BtnMotion>
          <BtnMotion
            onClick={handleDownvote}
            className={`btn btn-sm d-flex align-items-center gap-2 ${downVoteClass}`}
            disabled={disableVote}
          >
            <TbArrowBigDown size={20} /> <span className="fw-semibold">{downVoteTotal}</span>
          </BtnMotion>
          <BtnMotion
            onClick={handleShowComment}
            className={`btn btn-sm d-flex align-items-center gap-2 ${navLinkClass}`}
            disabled={disableVote}
          >
            <FiMessageSquare size={18} /> <span className="fw-semibold">{totalComments}</span>
          </BtnMotion>
        </div>
      </div>
      {/* Comments Section */}
      {showComments && (
        <div className={`p-4 border-top ${cardCommentsClass}`}>
          <h6 className="fw-bold mb-3">{t.comments || 'Comments'}</h6>
          
          {/* Add Comment Input */}
          <div className="mb-4 d-flex align-items-start gap-3">
            {authUser ? (
              <>
                <div className="flex-shrink-0">
                  <img
                    className="rounded-circle avatar-sm"
                    src={authUser.avatar}
                    alt={authUser.name}
                  />
                </div>
                <div className="flex-grow-1">
                  <div className="input-group">
                    <input
                      type="text"
                      className={`form-control form-control-modern border ${
                        theme === 'dark' ? 'bg-dark bg-opacity-50 text-light border-secondary' : 'border-secondary'
                      }`}
                      placeholder={t.addComment || 'Write a comment...'}
                      aria-label="Add comment"
                      value={commentContent}
                      onChange={handleCommentChange}
                    />
                    <BtnMotion
                      className="btn btn-primary-orange"
                      type="button"
                      onClick={handleCommentSubmit}
                      disabled={isSubmittingComment || !commentContent.trim()}
                    >
                      <IoIosSend size={20} />
                    </BtnMotion>
                  </div>
                </div>
              </>
            ) : (
              <p className={`${theme === 'dark' ? 'text-light opacity-75' : 'text-muted'} mb-0`}>
                {t.loginToComment || 'Login to comment'}
              </p>
            )}
          </div>
          
          {/* Comments List */}
          {comments && comments.length > 0 ? (
            <div className="d-flex flex-column gap-3">
              {comments.map((comment) => (
                <div key={comment.id} className={`p-3 rounded-3 ${theme === 'dark' ? 'bg-dark bg-opacity-25' : 'bg-white'}`}>
                  <div className="d-flex align-items-start mb-2">
                    <div className="flex-shrink-0">
                      <img
                        className="rounded-circle avatar-sm"
                        src={comment.owner.avatar}
                        alt={comment.owner.name}
                      />
                    </div>
                    <div className="flex-grow-1 ms-3">
                      <div className="mb-1">
                        <span className="fw-semibold me-2">{comment.owner.name}</span>
                        <small className={theme === 'dark' ? 'text-light opacity-75' : 'text-muted'}>
                          {postedAt(comment.createdAt)}
                        </small>
                      </div>
                      <div className="mb-2">
                        {isString(comment.content) === -1 ? comment.content : parse(comment.content)}
                      </div>
                      <div className="d-flex gap-2">
                        <BtnMotion
                          className={`btn btn-sm d-flex align-items-center gap-1 ${
                            theme === 'dark'
                              ? comment.upVotesBy.includes(authUser?.id)
                                ? 'bg-primary bg-opacity-25 text-primary border-primary'
                                : 'bg-secondary bg-opacity-25 text-light border-secondary'
                              : comment.upVotesBy.includes(authUser?.id)
                                ? 'bg-primary bg-opacity-25 text-primary border-primary'
                                : 'bg-light text-dark border-light'
                          }`}
                          onClick={() =>
                            handleCommentUpvote(comment.id, comment.upVotesBy.includes(authUser?.id))
                          }
                        >
                          <TbArrowBigUp size={16} /> {comment.upVotesBy.length}
                        </BtnMotion>
                        <BtnMotion
                          className={`btn btn-sm d-flex align-items-center gap-1 ${
                            theme === 'dark'
                              ? comment.downVotesBy.includes(authUser?.id)
                                ? 'bg-danger bg-opacity-25 text-danger border-danger'
                                : 'bg-secondary bg-opacity-25 text-light border-secondary'
                              : comment.downVotesBy.includes(authUser?.id)
                                ? 'bg-danger bg-opacity-25 text-danger border-danger'
                                : 'bg-light text-dark border-light'
                          }`}
                          onClick={() =>
                            handleCommentDownvote(comment.id, comment.downVotesBy.includes(authUser?.id))
                          }
                        >
                          <TbArrowBigDown size={16} /> {comment.downVotesBy.length}
                        </BtnMotion>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <p className={`${theme === 'dark' ? 'text-light opacity-75' : 'text-muted'} text-center mt-3`}>
              {t.noComments || 'No comments yet. Be the first to comment!'}
            </p>
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
