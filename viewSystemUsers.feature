@test002
Feature: Authenticated user can view system users

    Background:
        Given User navigates to the orange hrm application, logs in, and is present on the view system users page
    @validating_system_components
    Scenario:User is on System Users page
        Then User can see all the components on the view system users page

    @leave
    Scenario: User is able to view all components under the Leave tab
        When the user clicks on the "Leave" button
        Then the user should be able to view all the components within the Leave tab.

    @apply
    Scenario: User is able to view all components under the Apply tab
        When the user  selects  the "Apply" button
        Then the user should be able to view all the components within the Apply tab. 

    @myLeave
    Scenario: User is able to view all components under the My Leave tab
        When the user  selects  the "My Leave" button
        Then the user should be able to view all the components within the My Leave tab.

    @applyLeaveDateValidation
    Scenario Outline: User is able to view all components under the Apply Leave tab
        When the user  selects  the apply button
        And Enters the "<From Date>" and "<To Date>" 
        Then the user should receive a success or failure message
        Examples:
            | From Date | To Date | 
            | 2025-09-05  | 2025-09-05  |
            # | 2025-08-08  | 2025-04-08  |
            # | 2025-01-05  | 2025-01-05  |

    @tableFetchArrays
    Scenario: User is able to view all components under the My Leave tab using  arrays
        Then the user should be able to view all the components within the Table arrays.

    @tableFetchMaps
    Scenario: User is able to view all components under the My Leave tab using maps
        Then the user should be able to view all the components within the Table maps.

    @commentValidation
    Scenario: Validate the comment section
        Then validating the comment "party leda dheeraj" section
