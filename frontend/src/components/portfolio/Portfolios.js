import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types'

import {
  loadPortfolios,
  editPortfolioName
} from '../../actions/portfolio';
import './Portfolios.css';

const Portfolios = ({
  portfolios,
  loadPortfolios,
  editPortfolioName
}) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [portfolioId, setPortfolioId] = useState('');
  const [newPortfolioName, setNewPortfolioName] = useState('');

  useEffect(() => {
    loadPortfolios();
  }, []);

  const handleSubmit = event => {
    event.preventDefault();

    editPortfolioName(portfolioId, newPortfolioName);
    setIsModalOpen(false);
    setNewPortfolioName('');
    setPortfolioId('');
  };

  const handleChange = event => setNewPortfolioName(event.target.value)

  const openEditNameModal = id => {
    setIsModalOpen(true);
    setPortfolioId(id);
  }

  return (
    <React.Fragment>
      <div className="portfolios-container">
        {portfolios.map(portfolio => (
          <div className="portfolios-item" key={portfolio._id}>
            <div className="portfolios-item__name">{portfolio.name}</div>
            <div className="portfolios-edit-btn" onClick={() => openEditNameModal(portfolio._id)}>EDIT NAME</div>
            <div className="portfolios-delete-btn">DELETE</div>
          </div>
        ))}
      </div>
      {isModalOpen ? (
        <div className="modal-edit-name" >
          <div className="modal-content">
            <form onSubmit={e => handleSubmit(e)}>
              <div className="form-group">
                <label className="form-label">New Portfolio Name</label>
                <input
                  className="form-field"
                  type="text"
                  name="newPortfolioName"
                  value={newPortfolioName}
                  placeholder="Input new portfolio name"
                  onChange={e => handleChange(e)}
                />
              </div>
              <button type="submit">EDIT</button>
            </form>
          </div>
        </div>
      ) : null}
    </React.Fragment>
  );
}

Portfolios.propTypes = {
  loadPortfolios: PropTypes.func.isRequired,
  editPortfolioName: PropTypes.func.isRequired,
  portfolios: PropTypes.array.isRequired
};

const mapStateToProps = state => ({
  portfolios: state.portfolio.portfolios
});

export default connect(mapStateToProps, {
  loadPortfolios,
  editPortfolioName
})(Portfolios);
