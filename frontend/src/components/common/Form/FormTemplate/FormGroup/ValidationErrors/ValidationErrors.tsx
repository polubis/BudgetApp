import React from 'react';

import { ValidationResult } from '../../../types';

import MaterialIcon from '@material/react-material-icon';

import './ValidationErrors.scss';

type Props = {
  validationResult: ValidationResult;
}

const getClassByErrorStatus = (isError: boolean | null) => isError ? 'message-error' : 'message-ok';

const getCompletedCount = () => {} // dokonczyc liczbe errorow do uzupelnienia

const ValidationErrors = ({validationResult}: Props) => {

  return (
    <section className='validation-errors'>

    <h3 className='validation-errors__header row-b-c'>
      <span className='validation-errors__text'>2/4 completed</span>
      <MaterialIcon className='click' icon='close' />
    </h3>

    <ul className='validation-errors__list'>
      {Object.keys(validationResult).map(key => (
        <li className={`validation-errors__text row-b-c ${getClassByErrorStatus(validationResult[key].isError)}`} key={key}>
          <span>
            {validationResult[key].errorContent}
          </span>
          {validationResult[key].isError ? 
            <MaterialIcon icon='error'/> : 
            <MaterialIcon icon='check' />
          }
        </li>
      ))}
    </ul>

    </section>
  );
}

export default ValidationErrors;