import React from 'react';

//! imp icons
import CloseIcon from '../components/icons/CloseIcon';

const TagsInput = (props) => {
  const tags = props.value || [];

  const removeTags = (tagIndex) => {
    props.onChange([...tags.filter((_, index) => index !== tagIndex)]);
  };

  const addTags = (event) => {
    if (event.target.value !== '') {
      props.onChange([...tags, event.target.value]);
      event.target.value = ''; //! reset Input form
    }
  };

  return (
    <div
      className={`tags-input form-control ${
        props.errors.tags ? 'is-invalid' : ''
      }`}
    >
      <ul id="tags">
        {tags.map((tag, index) => (
          <li key={index} className="tag">
            <span className="tag-title">{tag}</span>
            <span className="tag-close-icon" onClick={() => removeTags(index)}>
            <CloseIcon size={'.5rem'} color="#fff" />
            </span>
          </li>
        ))}
      </ul>
      <input
        type="text"
        onKeyUp={(event) => (event.key === 'Enter' ? addTags(event) : null)}
        placeholder="Thêm tags cho sản phẩm"
      />
    </div>
  );
};

export default TagsInput;
