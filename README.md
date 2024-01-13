# Boo-Mongodb-Memory-Server is the name of the test project.

Brief description of your application.

This is a test application that performs the following functionalities. Someone is able to create a profile using details like:
      name,
      description,
      mbti
      zodiac
      enneagram
      variant,
      tritype,
      socionics,
      sloan,
      psyche,
      image 
 These users are able to vote on the personalities of other users in their profiles. The three personality options are MBTI, Enneagram, and Zodiac. There are other subsets of each of these personalities and every user is allowed to choose as many personalities as they think match the personality they are voting for.
 Also on the target profile, other users are able to make comments, like, and unlike comments too. They are also able to serve for comments based on the personalities of the people who comments, and search for comments based on how recent it is, or the number of likes the comments have.

### Prerequisites

- Node.js and npm installed.

### Installation

1. Clone the repository.
   git clone https://github.com/Visinho/Boo-Mongodb-Memory-Server.git

   ```

2. Install dependencies.
   ```bash
   npm install
   ```

3. Set up your environment variables (if any).

## Usage

### Creating a User

To create a user profile, send a POST request to the `profile/create` endpoint with the following parameters:

- `name`: User's name
- `description`: User's description
- `mbti`: MBTI type
- `zodiac`: Zodiac sign
- `enneagram`: Enneagram type
- `variant`: User's variant
- `tritype`: User's tritype
- `socionics`: User's socionics type
- `sloan`: User's Sloan type
- `psyche`: User's psyche
- `image`: URL to user's image

`http://localhost:3001/profile/create`

### Voting on Personalities

To vote on the personality of another user, send a POST request to the `profile/updateProfile/userId/targetId` endpoint with the following parameters:

- `userId`: ID of the user being voted on
- `voterId`: ID of the user casting the vote
- `personalityType`: Personality type chosen

 `http://localhost:3001/profile/updateProfile/65a1b7d71440bc3925e302fc/65a1b7e21440bc3925e302fe`
```

### Making Comments

To make a comment on the profile of another user, send a POST request to the `comment/` endpoint with the following parameters:

- `userId`: ID of the user making the comment
- `targetUserId`: ID of the user being commented on
- `text`: Comment text

`http://localhost:3001/comment/`
```

### Like and Dislike Comments

To like or dislike a comment, send a POST request to the `/like/` endpoint with the following parameters:

- `userId`: ID of the user liking/disliking the comment
- `commentId`: ID of the comment being liked/disliked. The same endpoint is being used to like or dislike a comment

`http://localhost:3001/like/`
```

There are also endpoints to:

Sort comments by personality type
Sort comments by most recent
Sort comments by the highest number of likes

## API Endpoints

('/profile/create'); //Create user profile
('/profile/:id'); //Get user profile
('/profile/updateProfile/:userId/:targetUserId'); //Update user profile

('/comment/'); // Create a comment
('/comment/'); // Get all comments
('/comment/sort-by-recent'); // Sort comments by recent date
('/comment/sort-by-like'); // Sort comments by number of likes
('/comment/sort-by-personalityType'); // Sort comments by Personality type

('/like'); //Like or dislike a comment


```