import React from 'react';
import { Form } from 'react-bootstrap';
import { useForm, useWatch } from 'react-hook-form';

const useYupValidationResolver = (validationSchema) =>
  React.useCallback(
    async (data) => {
      try {
        const values = await validationSchema.validate(data, {
          abortEarly: false,
        });

        return {
          values,
          errors: {},
        };
      } catch (errors) {
        return {
          values: {},
          errors: errors.inner.reduce(
            (allErrors, currentError) => ({
              ...allErrors,
              [currentError.path]: {
                type: currentError.type ?? 'validation',
                message: currentError.message,
              },
            }),
            {}
          ),
        };
      }
    },
    [validationSchema]
  );

const FormComponent = ({
  values,
  defaultValues,
  validationSchema,
  onSubmit,
  children,
}) => {
  const resolver = useYupValidationResolver(validationSchema);
  const methods = useForm({
    resolver,
    defaultValues: defaultValues,
  });

  // resetForm = methods.reset();

  //! initialize Values
  React.useEffect(() => {
    // initialValues?.forEach((v) => methods.setValue(v.name, v.value));
    methods.reset(values);
  }, [methods.reset, values]);

  const checkKeyDown = (e) => {
    if (e.code === 'Enter') {
      if (e.target.nodeName !== 'TEXTAREA') {
        e.preventDefault();
      }
    }
    // if (e.code === 'Enter')
    //   //! exception
    //   // if (
    //   //   e.target.nodeName === 'TEXTAREA' ||
    //   //   e.target.attributes[0].nodeValue === 'tag' ||
    //   //   e.target.name === 'image'
    //   // )
    //     return;
    // }
  };

  return (
    <Form
      onSubmit={methods.handleSubmit(onSubmit)}
      onKeyDown={(e) => checkKeyDown(e)}
    >
      {Array.isArray(children)
        ? children.map((child) => {
            return child.props.name
              ? React.createElement(child.type, {
                  ...{
                    ...child.props,
                    key: child.props.name,
                    methods,
                  },
                })
              : child;
          })
        : children}
    </Form>
  );
};

export default FormComponent;
