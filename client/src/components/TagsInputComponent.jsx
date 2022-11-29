import React from 'react';

const TagsInput = (props) => {
  const [tags, setTags] = React.useState(props.tags);

  React.useEffect(() => {
    props.onChange(tags);
  }, [tags]);

  const removeTags = (indexToRemove) => {
    setTags([...tags.filter((_, index) => index !== indexToRemove)]);
  };

  const addTags = (event) => {
    if (event.target.value !== '') {
      setTags([...tags, event.target.value]);
      event.target.value = '';
    }
  };

  console.log(
    '__Debugger__components__TabsInputComponent__props__value: ',
    props.value
  );

  return (
    <div className="tags-input">
      <ul id="tags">
        {tags?.map((tag, index) => (
          <li key={index} className="tag">
            <span className="tag-title">{tag}</span>
            <span className="tag-close-icon" onClick={() => removeTags(index)}>
              x
            </span>
          </li>
        ))}
      </ul>
      <input
        type="text"
        onKeyUp={(event) => (event.key === 'Enter' ? addTags(event) : null)}
        placeholder="Press enter to add tgs"
      />
    </div>
  );
};

export default TagsInput;
