import React, { useState, useEffect, useContext } from 'react';
import ThemeContext from '../contexts/ThemeContext';
import LanguageContext, { translations } from '../contexts/LanguageContext';
import { useDispatch, useSelector } from 'react-redux';
import { setAuthModalActionCreator } from '../states/authModal/action';
import { asyncAddThread } from '../states/threads/action';
function ThreadFormCard() {
  const { authUser = null } = useSelector((states) => states);
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
      await dispatch(asyncAddThread({ title, body, category }));
      setTitle('');
      setBody('');
      setCategory('');
      setIsExpanded(false);
    } finally {
      setIsLoading(false);
    }
  };

  const cardClass =
    theme === 'dark' ? 'bg-secondary bg-opacity-25 text-light' : 'bg-light text-dark';
  const inputClass =
    theme === 'dark'
      ? 'form-control border-0 bg-dark bg-opacity-50 text-light border-secondary'
      : 'form-control border-0 bg-secondary bg-opacity-25 text-dark border-secondary';

  useEffect(() => {
    setT(translations[language] || translations.id);
  }, [language]);

  return (
    <div className={`row card border-0 mb-2 p-3 ${cardClass}`}>
      <form onSubmit={handleSubmit}>
        <div
          className="d-flex align-items-center gap-3"
          onClick={!isExpanded ? handleClick : undefined}
        >
          {authUser ? (
            <div className="flex-shrink-0">
              <img
                className="rounded-circle"
                src={authUser.avatar}
                alt={authUser.id}
                title={authUser.name}
                style={{ height: '36px' }}
              />
            </div>
          ) : (
            <div className="d-flex align-items-center justify-content-center rounded-circle bg-secondary p-1 bg-opacity-50">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="32"
                height="32"
                fill="currentColor"
                className="bi bi-person text-white"
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
              placeholder={t.fill || 'Isi catatan...'}
              style={{ minWidth: 0 }}
              onClick={handleClick}
              readOnly
            />
          ) : (
            <div className="flex-grow-1 d-flex flex-column gap-2 pb-3">
              <input
                id="threadTitle"
                type="text"
                className={inputClass}
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder={t.titlePlaceholder || 'Judul thread...'}
                required
                autoFocus
                disabled={isLoading}
              />
              <textarea
                id="threadFill"
                className={inputClass}
                value={body}
                onChange={(e) => setBody(e.target.value)}
                placeholder={t.bodyPlaceholder || 'Isi thread...'}
                required
                rows="4"
                disabled={isLoading}
              />
              <div className="position-relative">
                <input
                  id="threadCategory"
                  type="text"
                  className={inputClass}
                  value={category}
                  onChange={handleCategoryChange}
                  placeholder={t.categoryPlaceholder || 'Kategori, dipisah koma...'}
                  disabled={isLoading}
                  maxLength={maxCategoryLength}
                />
                <small className="form-text text-danger position-absolute end-0 me-2">
                  {maxCategoryLength - category.length} {t.charactersLeft || 'karakter tersisa'}
                </small>
              </div>
            </div>
          )}

          {/* Button section */}
          {isExpanded ? (
            <div className="d-flex flex-column gap-2">
              <button
                id="threadPublish"
                type="submit"
                className="btn btn-primary-orange"
                style={{ whiteSpace: 'nowrap', minWidth: 150 }}
                disabled={isLoading}
              >
                {isLoading ? t.loading || 'Posting...' : t.post}
              </button>
              <button
                type="button"
                className="btn btn-outline-secondary"
                onClick={() => setIsExpanded(false)}
                disabled={isLoading}
              >
                {t.cancel || 'Cancel'}
              </button>
            </div>
          ) : (
            <button
              type="button"
              className="btn btn-primary-orange"
              style={{ whiteSpace: 'nowrap', minWidth: 150 }}
              onClick={handleClick}
              id="dummyButtonInput"
            >
              {t.post}
            </button>
          )}
        </div>
      </form>
    </div>
  );
}

export default ThreadFormCard;
