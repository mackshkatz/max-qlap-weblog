def login(user, plain_text_password)
	visit login_path
	fill_in "email", :with => user.email
	fill_in "password", :with => plain_text_password
	click_button "Log in"
end