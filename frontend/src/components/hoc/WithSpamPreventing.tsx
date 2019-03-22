import React, { useState, useEffect } from 'react';
import { Subtract } from 'utility-types';
import { Subject } from 'rxjs';
import { debounceTime } from 'rxjs/operators';

export interface InjectedProps {
  debouncedAction: (e: React.MouseEvent<HTMLButtonElement>) => void;
}

const withSpamPreventing = <P extends InjectedProps>(Component: React.ComponentType<P>) => {
  return (props: Subtract<P, InjectedProps>) => {
    const [ $event ] = useState(new Subject());
    useEffect(() => {
      $event.pipe(
        debounceTime(500)
      ).subscribe((value: any) => {
      })    

      return () => {
        $event.unsubscribe();
      }
    }, []);
    return (
      <Component 
        {...props as P} 
        debouncedAction={(e: React.MouseEvent<HTMLButtonElement>) => {
          $event.next(e);
        }}
      />
    );
  }
}

export default withSpamPreventing;