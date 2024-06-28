import React, { useState } from 'react';
import './amortizationModal.scss';
import { useAppContext } from '../../../../../../contexts/appContext';
import { AmortizationScheduleEntry } from '../../../../../../utils/ammortizationCalc';
import {
  closeAnimation,
  formatToWholeDollarAmount,
} from '../../../../../../utils/utils';
import SearchIcon from '@mui/icons-material/Search';
import OpenInFullIcon from '@mui/icons-material/OpenInFull';

// ADD FEATURE: download to xls or csv

const AmortizationModal: React.FC = () => {
  const { amortizationSchedule, results } = useAppContext();
  const [showModal, setShowModal] = useState(false);
  const [animation, setAnimation] = useState(true);

  const handleOpenModal = () => {
    setAnimation(true);
    setShowModal(true);
  };

  const handleCloseAnimation = () => {
    setAnimation(false);
    closeAnimation(setShowModal);
  };

  return (
    <>
      {showModal && (
        <div className={'modal-wrapper ' + (animation ? 'in' : 'out')}>
          {/* Modal Content */}
          <div className={'modal-container  ' + (animation ? 'in' : 'out')}>
            <div
              className="close-button"
              onClick={() => handleCloseAnimation()}
            ></div>
            <div className="modal-title">Amortization Schedule</div>
            <div className="schedule">
              <div className="schedule-row header">
                <div></div>
                <div className="column-title principal">principal</div>
                <div className="column-title interest">interest</div>
                <div className="column-title fees">fees & tax</div>
                <div className="column-title balance">balance</div>
              </div>
              {amortizationSchedule?.data.map(
                (year: AmortizationScheduleEntry) => {
                  return (
                    <div className="schedule-row">
                      <div className="row-title">year {year.year}</div>
                      <div>{formatToWholeDollarAmount(year.principal)}</div>
                      <div>{formatToWholeDollarAmount(year.interest)}</div>
                      <div>{formatToWholeDollarAmount(year.fees)}</div>
                      <div>{formatToWholeDollarAmount(year.balance)}</div>
                    </div>
                  );
                }
              )}
              <div className="schedule-row total">
                <div className="row-title">Totals</div>
                <div>{formatToWholeDollarAmount(results.housePrice)}</div>
                <div>{formatToWholeDollarAmount(results.totalInterest)}</div>
                <div>
                  {formatToWholeDollarAmount(
                    results.totalHOA +
                      results.totalInsurance +
                      results.totalPropertyTax
                  )}
                </div>
                <div></div>
              </div>
            </div>
          </div>
          {/* Modal Background */}
          <div
            className={'modal-background ' + (animation ? 'in' : 'out')}
            onClick={() => handleCloseAnimation()}
          ></div>
        </div>
      )}
      {/* <div className='icon' onClick={() => handleOpenModal()}> */}
      <OpenInFullIcon className="icon" onClick={() => handleOpenModal()} />
      {/* </div> */}
    </>
  );
};

export default AmortizationModal;
