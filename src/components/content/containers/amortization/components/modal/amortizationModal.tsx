import React, { useState } from 'react';
import './amortizationModal.scss';
import { useAppContext } from '../../../../../../contexts/appContext';
import { AmortizationScheduleEntry } from '../../../../../../utils/ammortizationCalc';
import {
  closeAnimation,
  formatToWholeDollarAmount,
} from '../../../../../../utils/utils';
import SearchIcon from '@mui/icons-material/Search';

// ADD FEATURE: download to xls or csv

const AmortizationModal: React.FC = () => {
  const { amortizationSchedule } = useAppContext();
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
            <div>
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
                  <div className="column-title fees">fees</div>
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
                {/* CREATE A TOTALS ROW */}
                {/* CREATE A TOTALS ROW */}
                {/* CREATE A TOTALS ROW */}
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
      <SearchIcon className="icon" onClick={() => handleOpenModal()} />
      {/* </div> */}
    </>
  );
};

export default AmortizationModal;
