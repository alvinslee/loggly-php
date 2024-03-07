// Fetch and display list of usernames
function fetchUsers() {
  $.ajax({
    url: 'get_users.php',
    type: 'GET',
    dataType: 'json',
    success: function(users) {
      let html = '<table class="highlight"><thead><tr><th>Usernames</th><th>Action</th></tr></thead><tbody>';
      users.forEach(user => {
        html += `<tr id="user_${user.username}"><td><a href="#" onclick="fetchUserDetails('${user.username}')">${user.username}</a></td>
                 <td><a href="#" onclick="deleteUser('${user.username}')"><i class="material-icons">delete</i></a></td></tr>`;
      });
      html += '</tbody></table>';
      $('#content').html(html);
      $('#addUserFormContainer').show();
    },
    error: function() {
      $('#content').html('<p class="red-text">Failed to fetch data.</p>');
    }
  });
}

function fetchUserDetails(username) {
  $.ajax({
    url: 'get_user_details.php',
    type: 'GET',
    data: { username: username },
    dataType: 'json',
    success: function(userDetails) {
      let html = `<div class="card">
                    <div class="card-content">
                      <span class="card-title">${username}</span>
                      <p>First Name: ${userDetails.first_name}</p>
                      <p>Last Name: ${userDetails.last_name}</p>
                      <p>Email: ${userDetails.email}</p>
                    </div>
                    <div class="card-action">
                      <a href="#" onclick="fetchUsers()">Return to user list</a>
                    </div>
                  </div>`;
      $('#content').html(html);
      $('#addUserFormContainer').hide();
    },
    error: function() {
      $('#content').html('<p class="red-text">Failed to fetch user details.</p>');
    }
  });
}

// Function to delete a user
function deleteUser(username) {
  if(confirm('Are you sure you want to delete this user?')) {
    $.ajax({
      url: 'delete_user.php',
      type: 'POST',
      data: JSON.stringify({ username: username }),
      dataType: 'json',
      contentType: 'application/json',
      success: function(response) {
        if(response.success) {
          M.toast({html: 'User deleted successfully'});
          fetchUsers(); // Refresh the user list
        } else {
          M.toast({html: 'Error deleting user'});
        }
      },
      error: function() {
        M.toast({html: 'Error in connection'});
      }
    });
  }
}

$(document).ready(function() {
  fetchUsers();

  $("#addUserForm").submit(function(e) {
    e.preventDefault(); // Prevent default form submission
    $.ajax({
      url: 'add_user.php', // Backend script to process the insert
      type: 'POST',
      data: JSON.stringify(
        {
          username: $('#username').val(),
          first_name: $('#first_name').val(),
          last_name: $('#last_name').val(),
          email: $('#email').val(),
        }
      ),
      dataType: 'json',
      contentType: 'application/json',
      success: function(response) {
        if(response.success) {
          M.toast({html: 'User added successfully'});
          // Insert the new user at the top of the table
          const newUserRow = `<tr id="user_${response.username}"><td><a href="#" onclick="fetchUserDetails('${response.username}')">${response.username}</a></td>
                              <td><a href="#" onclick="deleteUser('${response.username}')"><i class="material-icons">delete</i></a></td></tr>`;
          $('table tbody').prepend(newUserRow);
          $('#username').val('');
          $('#first_name').val('');
          $('#last_name').val('');
          $('#email').val('');
        } else {
          M.toast({html: 'Error adding user'});
        }
      },
      error: function() {
        M.toast({html: 'Error in connection'});
      }
    });
  });
});
