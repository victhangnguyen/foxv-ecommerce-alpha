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

const FormComponent = (props) => {
  const resolver = useYupValidationResolver(props.validationSchema);
  const {
    control,
    handleSubmit,
    register,
    setValue,
    formState: { errors },
  } = useForm({
    resolver,
  });

  React.useEffect(() => {
    props?.initialValues?.forEach((v) => setValue(v.name, v.value));
  }, []);

  return (
    <Form onSubmit={handleSubmit(props.onSubmit)}>
      {Array.isArray(props.children)
        ? props.children.map((child) => {
            return child.props.name
              ? React.createElement(child.type, {
                  ...{
                    ...child.props,
                    register,
                    control,
                    key: child.props.name,
                    errors,
                  },
                })
              : child;
          })
        : props.children}
    </Form>
  );
};

export default FormComponent;
