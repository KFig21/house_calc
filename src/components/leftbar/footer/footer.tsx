import KFLogo from './KFlogo';
import GitHubIcon from '@mui/icons-material/GitHub';
import './footer.scss';

const Footer: React.FC = () => {
  return (
    <div className="footer">
      <div className="footer-container">
        <KFLogo />
        <div className="made-by">Made by KFig21</div>
        <a
          href="https://github.com/KFig21/"
          target="_blank"
          rel="noopener noreferrer"
        >
          <GitHubIcon className="footer-icon" />
        </a>
      </div>
    </div>
  );
};

export default Footer;
