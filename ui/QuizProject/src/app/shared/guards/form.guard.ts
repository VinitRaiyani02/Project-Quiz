import { CanDeactivateFn } from '@angular/router';
import { Observable } from 'rxjs';

export interface IDeactivateComponent{
  canGoBack: () => Observable<boolean> | Promise<boolean> | boolean;
}

export const formGuard: CanDeactivateFn<IDeactivateComponent> = (component, currentRoute, currentState, nextState) => {
  return component.canGoBack();
};
