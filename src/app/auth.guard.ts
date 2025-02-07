// Importing necessary modules and services
import { inject } from '@angular/core'; // Angular utility to inject services or dependencies.
import { CanActivateFn, Router } from '@angular/router'; // CanActivateFn is a function used to protect routes. 
//Router is for navigation.
import { AuthService } from './services/auth.service'; // Importing a custom authentication service.
import { map } from 'rxjs/operators'; // `map` operator from RxJS to transform observables.

// Define the authGuard function
export const authGuard: CanActivateFn = (route) => {   
  // Inject the AuthService dependency
  const authService = inject(AuthService); 
  // Inject the Router dependency for navigation
  const router = inject(Router);

   // Get roles required for this route from route data
   const requiredRoles = route.data?.['roles'] as string[] || [];      

  // Return an observable that determines if the route can be activated
  return authService.isLoggedIn$.pipe(
    map((isLoggedIn) => {
    if(isLoggedIn && authService.hasAnyRole(requiredRoles)) { 
      // Check if the user is logged in
        return true; 
      } else {
        // If not logged in, redirect to the login page
        router.navigate(['/login']); 
        // Prevent navigation to the protected route
        return false; 
      }
    })
  );
};
