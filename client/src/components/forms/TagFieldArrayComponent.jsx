import React from 'react';
import { useFieldArray } from 'react-hook-form';
import CloseIcon from '../icons/CloseIcon';

const SelectFieldArrayComponent = ({ control, name, errors }) => {
  const { fields, append, prepend, remove, swap, move, insert, replace } =
    useFieldArray({
      control,
      name: { name },
    });

  // const tags = props.value || [];
  const tags = [];

  const removeTags = (tagIndex) => {
    // props.onChange([...tags.filter((_, index) => index !== tagIndex)]);
  };

  const addTags = (event) => {
    // if (event.target.value !== '') {
    //   props.onChange([...tags, event.target.value]);
    //   event.target.value = ''; //! reset Input form
    // }
  };

  return (
    <div
      className={`tags-input form-control ${errors.tags ? 'is-invalid' : ''}`}
    >
      {/* <ul id="tags">
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
      /> */}
    </div>
  );
};

export default SelectFieldArrayComponent;
