
prerequisites

1. create a fcebook app. 

2. on this url, https://developers.facebook.com/apps/{app-Id}/fb-login/settings/, check "Login with the JavaScript SDK" to yes.
3. Also add your website url to this site

4. To add use cases (get more information of user), go to https://developers.facebook.com/apps/{app-Id}/use_cases. Click on edit button in front of 
    "Use additional Facebook user data for personalization" and 
    "Authentication and account creation" 
fields and add use cases (add permissions).



1.  first on client side add this code to your app
<script>
        window.fbAsyncInit = function () {
        window.FB.init({
        appId: '2820397444764167',
        autoLogAppEvents: true,
        xfbml: true,
        version: 'v16.0'
        });

                };
</script>

2.  call this function on click event or by any other method.

    function loginWithFacebook() {
    window.FB.login(function (response: any) {
    if (response.authResponse) {
    consol.log(response.authResponse)

                } else {
                    console.log('User cancelled login or did not fully authorize.');
                }
            }, { scope: 'public_profile,email' });
        }

3.  The above function would give an access token in response.  send that token to the following facebook graph api. This would return user info in response.
https://graph.facebook.com/v16.0/me?fields=id,name,age_range,first_name,last_name,email,location,picture.type(large)&access_token=${accessToken}


