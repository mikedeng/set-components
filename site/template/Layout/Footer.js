import React from 'react';

export default function Header(props) {
  const { friendLink = [] } = props;
  return (
    <div className="footer">
      <ul className="friend-link">
        {friendLink.map(({ name, href }) => (
          <li key={name}><a href={href} target="_blank" rel="noopener noreferrer">{name}</a></li>))
        }
      </ul>
      <p className="copyright">
        powered by
        <a style={{ paddingLeft: 10 }} href="http://mikedeng.github.io" target="_blank" rel="noopener noreferrer">Mike Dune</a>
      </p>
    </div>
  );
}
