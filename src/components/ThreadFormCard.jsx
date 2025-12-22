import React, { useState, useEffect, useContext } from 'react';
import ThemeContext from '../contexts/ThemeContext';
import LanguageContext, { translations } from '../contexts/LanguageContext';
import { useDispatch, useSelector } from 'react-redux';
import { setAuthModalActionCreator } from '../states/authModal/action';
import { asyncAddThread } from '../states/threads/action';
import BtnMotion from './BtnMotion';
function ThreadFormCard() {
  const authUser = useSelector((state) => state.authUser);
  const dispatch = useDispatch();
  const { theme } = useContext(ThemeContext);
  const { language } = useContext(LanguageContext);
  const [t, setT] = useState(translations[language] || translations.id);
  const [isExpanded, setIsExpanded] = useState(false);
  const [title, setTitle] = useState('');
  const [body, setBody] = useState('');
  const [category, setCategory] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const maxCategoryLength = 20;

  const handleClick = () => {
    if (!authUser) {
      dispatch(setAuthModalActionCreator(true));
      return;
    }
    setIsExpanded(true);
  };

  const handleCategoryChange = (e) => {
    const input = e.target.value;
    if (input.length <= maxCategoryLength) {
      setCategory(input);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!authUser) {
      dispatch(setAuthModalActionCreator(true));
      return;
    }

    setIsLoading(true);
    try {
      const result = await dispatch(asyncAddThread({ title, body, category }));
      // Only reset form if thread was successfully created
      if (result !== false) {
        setTitle('');
        setBody('');
        setCategory('');
        setIsExpanded(false);
      }
    } catch (error) {
      console.error('Failed to create thread:', error);
      alert('Failed to create thread. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  const cardClass =
    theme === 'dark' ? 'modern-card-dark text-light' : 'modern-card text-dark';
  const inputClass =
    theme === 'dark'
      ? 'form-control form-control-modern border-0 bg-dark bg-opacity-50 text-light'
      : 'form-control form-control-modern border-0 bg-white text-dark';

  useEffect(() => {
    setT(translations[language] || translations.id);
  }, [language]);

  return (
    <div className={`card border-0 mb-3 p-4 ${cardClass}`}>
      <form onSubmit={handleSubmit}>
        <div
          className="d-flex align-items-start gap-3"
          onClick={!isExpanded ? handleClick : undefined}
          style={{ cursor: !isExpanded ? 'pointer' : 'default' }}
        >
          {authUser ? (
            <div className="flex-shrink-0">
              <img
                className="rounded-circle avatar-md"
                src={authUser.avatar}
                alt={authUser.id}
                title={authUser.name}
              />
            </div>
          ) : (
            <div className="d-flex align-items-center justify-content-center rounded-circle bg-secondary p-2 bg-opacity-25 avatar-md">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="28"
                height="28"
                fill="currentColor"
                className="bi bi-person"
                viewBox="0 0 16 16"
              >
                <path d="M8 8a3 3 0 1 0 0-6 3 3 0 0 0 0 6m2-3a2 2 0 1 1-4 0 2 2 0 0 1 4 0m4 8c0 1-1 1-1 1H3s-1 0-1-1 1-4 6-4 6 3 6 4m-1-.004c-.001-.246-.154-.986-.832-1.664C11.516 10.68 10.289 10 8 10s-3.516.68-4.168 1.332c-.678.678-.83 1.418-.832 1.664z" />
              </svg>
            </div>
          )}

          {!isExpanded ? (
            <input
              type="text"
              className={`${inputClass} flex-grow-1`}
              placeholder={t.fill || 'What\'s on your mind?'}
              style={{ minWidth: 0 }}
              onClick={handleClick}
              readOnly
            />
          ) : (
            <div className="flex-grow-1 d-flex flex-column gap-3">
              <input
                id="threadTitle"
                type="text"
                className={inputClass}
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder={t.titlePlaceholder || 'Title...'}
                required
                autoFocus
                disabled={isLoading}
              />
              <textarea
                id="threadFill"
                className={inputClass}
                value={body}
                onChange={(e) => setBody(e.target.value)}
                placeholder={t.bodyPlaceholder || 'Share your thoughts...'}
                required
                rows="4"
                disabled={isLoading}
                style={{ resize: 'none' }}
              />
              <div className="position-relative">
                <input
                  id="threadCategory"
                  type="text"
                  className={inputClass}
                  value={category}
                  onChange={handleCategoryChange}
                  placeholder={t.categoryPlaceholder || 'Add tags...'}
                  disabled={isLoading}
                  maxLength={maxCategoryLength}
                />
                <small className={`position-absolute end-0 me-3 mt-2 ${theme === 'dark' ? 'text-light' : 'text-muted'}`}>
                  {maxCategoryLength - category.length}
                </small>
              </div>
            </div>
          )}

          {/* Button section */}
          {isExpanded && (
            <div className="d-flex flex-column gap-2">
              <BtnMotion
                id="threadPublish"
                type="submit"
                className="btn btn-primary-orange"
                style={{ whiteSpace: 'nowrap', minWidth: 120 }}
                disabled={isLoading}
              >
                {isLoading ? (
                  <>
                    <span className="spinner-border spinner-border-sm me-2" role="status" aria-hidden="true"></span>
                    Posting...
                  </>
                ) : (
                  t.post || 'Post'
                )}
              </BtnMotion>
              <BtnMotion
                type="button"
                className={`btn ${theme === 'dark' ? 'btn-outline-light' : 'btn-outline-secondary'}`}
                onClick={() => setIsExpanded(false)}
                disabled={isLoading}
              >
                {t.cancel || 'Cancel'}
              </BtnMotion>
            </div>
          )}

          {!isExpanded && (
            <BtnMotion
              type="button"
              className="btn btn-primary-orange"
              style={{ whiteSpace: 'nowrap', minWidth: 100 }}
              onClick={handleClick}
              id="dummyButtonInput"
            >
              {t.post || 'Post'}
            </BtnMotion>
          )}
        </div>
      </form>
    </div>
  );
}

export default ThreadFormCard;
