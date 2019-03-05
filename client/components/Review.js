import React from 'react'
import {Icon, Feed} from 'semantic-ui-react'

export const Review = props => {
  const {user, review} = props
  const name = user.firstName ? user.firstName : 'Anonymous'
  return (
    <Feed>
      <Feed.Event>
        <Feed.Label>
          <Icon color="yellow" name="star" />
        </Feed.Label>
        <Feed.Content textAlign="left">
          <Feed.Extra text content={name} />
          <Feed.Summary content={review.reviewText} />
          <Feed.Meta text content={`${review.rating} stars`} />
        </Feed.Content>
      </Feed.Event>
    </Feed>
  )
}

export default Review
