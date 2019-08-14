import React from 'react';
import nullResultChecker from '../../utils/queryOutputDisplay/nullResultChecker';

const NullResultCheck = (props) => {
  const { isHovering, toggleHover, result } = props;

  return (
    <section>
      <aside font="helevtica" className="error">
        Null values returned from query.
        <br />
        Please double check your query.
        <br />
        <span onMouseEnter={() => toggleHover(true)} onMouseLeave={() => toggleHover(false)}>Hover for details.</span>
        {isHovering && (
          <article id="tooltip">
            <ul>
              {nullResultChecker(result)}
            </ul>
          </article>
        )
        }
        <br />
        <br />
      </aside>
    </section>
  );
};

export default NullResultCheck;
