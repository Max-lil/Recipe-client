# How To Use This File

If you are helping with code in this project, read this file first and follow it before making changes.

Always prefer:
- simple code
- explicit logic
- minimal abstractions
- beginner-friendly readability

# Coding Style

This project should stay easy to read, easy to change, and easy to learn from.

The main goal is clarity over cleverness.

## Main Rule

Prefer simple and explicit code over advanced, abstract, or overly reusable solutions.

## Project Mindset

This codebase should feel beginner-friendly and practical.

That means:
- write code that is easy to follow line by line
- prefer patterns already used in the project
- keep files focused and readable
- avoid unnecessary abstractions
- choose clarity over “smart” code

## React

- Keep components small and focused on one job.
- Split large components when they become hard to read.
- Prefer straightforward JSX over clever rendering patterns.
- Avoid deeply nested conditional UI.
- Prefer simple event handlers with clear names.
- Keep logic close to where it is used unless there is a strong reason not to.

Good:
- small components
- clear props
- simple conditional rendering
- readable event handlers

Avoid when possible:
- components doing too many things
- complicated wrapper components
- too much prop drilling without reason
- clever patterns that make JSX harder to follow

## TypeScript

- Use TypeScript to make code safer and clearer.
- Prefer simple types over advanced generic types.
- Use explicit types when they improve readability.
- Let TypeScript infer types when the code is already obvious.

Good:
- simple `type` aliases
- clear prop types
- clear API response types

Avoid when possible:
- complex generic utility types
- advanced conditional types
- clever inferred types that are hard to understand
- types that are technically correct but hard to read

## Zod

- Use Zod to validate forms, params, and API data clearly.
- Keep schemas close to the data they validate.
- Prefer small, readable schemas.
- Use clear validation messages.

Good:
- one schema per form or request
- simple refinements
- readable field names

Avoid when possible:
- very large schemas with too much logic inside
- hard-to-read chained refinements
- validation that feels “magic”

## Mantine UI

- Use Mantine components in a straightforward way.
- Prefer Mantine when it already solves the problem clearly.
- Keep layout structure easy to understand.

Good:
- clear use of `Stack`, `Group`, `Flex`, `Container`
- simple forms with Mantine inputs
- consistent spacing and layout

Avoid when possible:
- too many nested layout components
- heavy customization when a simple Mantine solution works
- mixing too many layout approaches in one file

## Tailwind CSS

- Use Tailwind for simple styling and layout adjustments.
- Keep class names readable and grouped logically.
- Prefer consistency over perfect micro-optimization.

Good:
- spacing, sizing, alignment, display utilities
- small visual tweaks
- simple responsive layouts

Avoid when possible:
- very long unreadable class strings
- mixing Tailwind and Mantine styles in confusing ways
- styling that is hard to trace

## Mantine + Tailwind Together

- Let Mantine handle components and structure.
- Let Tailwind handle layout, spacing, and light styling when useful.
- Do not force both into every component.

Preferred approach:
- Mantine for inputs, buttons, modals, cards, layout helpers
- Tailwind for page spacing, section layout, width, gap, alignment

## TanStack Query

- Use TanStack Query for server state.
- Keep query hooks simple and clearly named.
- Make loading and error states easy to see in the UI.
- Use query keys consistently.

Good:
- `useRecipesQuery`
- `useCreateRecipeMutation`
- simple invalidation after create/update/delete

Avoid when possible:
- overly abstract query helpers
- query logic hidden in too many layers
- mutation flows that are hard to trace

## TanStack Router

- Keep routes easy to understand.
- Put route-specific logic close to the route.
- Use loaders or route logic only when it clearly improves the code.

Good:
- clear route files
- readable route params and search params
- simple navigation flow

Avoid when possible:
- too much route abstraction
- hiding route behavior in too many helper files
- complicated route setup that is hard to follow

## API Calls and Data Flow

- Keep API functions simple and predictable.
- Use clear names for requests.
- Keep request and response handling easy to trace.

Good:
- `getRecipes`
- `createRecipe`
- `scrapeRecipe`

Avoid when possible:
- one giant API file with mixed responsibilities
- unclear naming
- hidden transformations that make debugging harder

## Forms

- Keep forms simple and readable.
- Match form fields closely to the validation schema.
- Make submit behavior easy to follow.

Good:
- clear submit handlers
- clear default values
- clear error display

Avoid when possible:
- too much form abstraction
- form logic spread across too many files
- hidden value transformations

## File Organization

- Keep related code close together.
- Prefer simple folder structures.
- Do not split files too early.

Good:
- route file
- component file
- query/api file
- validation/schema file

Avoid when possible:
- many tiny files with unclear purpose
- splitting logic before the file is actually too large
- organizing by theory instead of practical readability

## Naming

- Use names that describe what the code does.
- Prefer practical names over overly generic names.

Good:
- `RecipeForm`
- `RecipeCard`
- `useRecipesQuery`
- `createRecipeSchema`

Avoid:
- `Helper`
- `Manager`
- `Utils`
- vague names that hide purpose

## Good Defaults

- Prefer simple `if` statements over clever one-liners.
- Prefer repeating a small amount of code if it makes the code easier to read.
- Keep functions focused on one job.
- Keep components easy to scan quickly.
- Use comments sparingly, only when they truly help.

## Avoid When Possible

- over-engineered abstractions
- advanced TypeScript tricks
- “smart” reusable systems that are harder to understand than direct code
- deeply nested UI logic
- giant components
- giant custom hooks
- styling patterns that are hard to trace

## Goal

Anyone working in this project should be able to open a file and understand what it does without needing advanced knowledge of React, TypeScript, TanStack, or UI architecture.

The code should feel calm, clear, and practical.
