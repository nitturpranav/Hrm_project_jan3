@test001
Feature: User Authentication tests

  Background:
    Given User navigates to the orange hrm application
  @login_components
  Scenario: Validating the components in the login page
    Then User should see all components on the login page

  @social_media_links
  Scenario: Validating The Social Media Links
    When User clicks on the social media links
  # Then User should be redirected to the respective social media page

  @login_feature
  Scenario Outline: Validating the login functionality
    When User enters the valid credentials "<username>" and "<password>" and clicks on the login button
    # Then User should be navigated to the dashboard page
    Examples:
      | username | password  |
      | Admin    | admin123  |
      | Admin    | admin12   |
      | User     | admin123  |
      | User123  | admin1234 |

  @forgot_password 
  Scenario: Validating the forgot password functionality
    When User clicks on the forgot password link
    Then User should be navigated to the forgot password page
    And User should see the reset password link message after clicking the reset button

  
