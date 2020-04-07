/**
 * Card Actions component.
 *
 * @param {Object} props - Component props.
 * @param {boolean} props.displayPostAuthor - Whether or not to display the post author field.
 * @param {boolean} props.displayCommentsCount - Whether or not to display the post comments count field.
 * @param {Object} props.post - Post data.
 *
 * @return {Function} A functional component.
 */
const CardActions = ( { displayPostAuthor, displayCommentsCount, post } ) => (
	<div className="mdc-card__actions">
		<div className="mdc-card__action-buttons">
			{ displayPostAuthor && (
				<button className="mdc-button mdc-card__action mdc-card__action--button mdc-button__post-author">
					<span className="mdc-button__ripple"></span>
					<i className="material-icons mdc-button__icon" aria-hidden="true">
						face
					</i>
					<span className="mdc-button__label">{ post.authorDisplayName }</span>
				</button>
			) }
			{ displayCommentsCount && (
				<>
					<button className="mdc-button mdc-card__action mdc-card__action--button mdc-button__comment-count">
						<span className="mdc-button__ripple"></span>
						<i className="material-icons mdc-button__icon" aria-hidden="true">
							comment
						</i>
						<span className="mdc-button__label">{ post.commentsCount }</span>
					</button>
				</>
			) }
		</div>
	</div>
);

export default CardActions;