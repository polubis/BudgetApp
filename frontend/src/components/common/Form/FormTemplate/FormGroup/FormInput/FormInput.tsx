import React from 'react';
import MaterialIcon from '@material/react-material-icon';

import './FormInput.scss';

type FormInputProps = {
  icon?: string;
  contentClasses?: string;
  renderInput: () => React.ReactNode;
  renderValidation?: () => React.ReactNode;
}

const FormInput = ({icon, renderInput, renderValidation, contentClasses = ''}: FormInputProps) => (
  <div className={`form-group__content ${contentClasses}`}>

    {renderInput()}

    {icon && 
      <div className='content__rect row-c-c'>
        <MaterialIcon icon={icon} />
      </div>
    }

    {renderValidation && renderValidation()}

  </div>
);

export default FormInput;