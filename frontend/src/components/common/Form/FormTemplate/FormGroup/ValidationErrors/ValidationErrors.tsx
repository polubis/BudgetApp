import React from 'react';

import { ValidationResult } from '../../../types';

import MaterialIcon from '@material/react-material-icon';

import './ValidationErrors.scss';

type Props = {
  validationResult: ValidationResult;
}

const getClassByErrorStatus = (isError: boolean | null) => isError ? 'message-error' : 'message-ok';

const getCompletedCount = (keys: string[], validationResult: ValidationResult): number =>
  keys.filter(key => !validationResult[key].isError).length;

const ValidationErrors = ({validationResult}: Props) => {
  const keys: string[] = Object.keys(validationResult);

  return (
    <section className='validation-errors'>

    <h3 className='validation-errors__header row-b-c'>
      <span className='validation-errors__text'>{getCompletedCount(keys, validationResult)}/{keys.length} completed</span>
      <MaterialIcon className='click' icon='close' />
    </h3>

    <ul className='validation-errors__list'>
      {keys.map(key => (
        <li key={key} className={`validation-errors__text row-b-c ${getClassByErrorStatus(validationResult[key].isError)}`}>
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