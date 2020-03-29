import React, { useEffect } from "react";
import styled from "styled-components";
import { useParams } from "react-router-dom";
import { ReactComponent as TicketSVG } from "../assets/ticket.svg";
import {
  MobileLayout,
  MobileHeader,
  MobileContent
} from "../components/MobileLayout";
import { ButtonOutline } from "../components/Button";
import { useDispatch, useSelector } from "react-redux";
import { getTicket } from "../state/ClientTicket";
import { getLocations } from "../state/Locations";

const DateTimeLayout = styled.div`
  width: 22vh;
  height: 22vh;
  border-radius: 50%;
  border: 12px solid #ffcc09;
  box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 1rem;
`;
const DateDay = styled.div`
  font-family: Avenir Next;
  font-style: normal;
  font-weight: 600;
  font-size: normal;
  color: #055d88;
`;
const DateHour = styled.div`
  font-family: Avenir Next;
  font-style: normal;
  font-weight: bold;
  font-size: x-large;
  color: #055d88;
`;
const DateTime = ({ day, hours }) => {
  return (
    <DateTimeLayout>
      <DateDay>{day}</DateDay>
      <DateHour>{hours}</DateHour>
    </DateTimeLayout>
  );
};
const TicketTitle = styled.h2`
  width: 100%;
  display: flex;
  flex-direction: row;
  justify-content: flex-start;
  align-items: flex-start;
`;
const TicketTitleContent = styled.div`
  flex: 1;
  span {
    font-size: small;
    font-style: normal;
  }
`;
export function TicketView() {
  const dispatch = useDispatch();
  let { id } = useParams();
  const ticket = useSelector(state => {
    const t = state.clientTicket;
    if (t === null) {
      return null;
    }
    const location =
      state.locations && state.locations.find(l => t.locationId === l.id);
    return { ...t, location };
  });

  useEffect(() => {
    dispatch(getLocations());
    dispatch(getTicket(id));
  }, [dispatch, id]);

  if (!ticket || !ticket.location) {
    return <div>loading ...</div>;
  }
  return (
    <MobileLayout>
      <MobileHeader />
      <MobileContent>
        <TicketTitle>
          <TicketSVG />
          <TicketTitleContent>
            <div>{ticket.location.name}</div>
            <span>Adresse du centre</span>
          </TicketTitleContent>
          <div>#{ticket.id}</div>
        </TicketTitle>
        <h3>Date et heure de passage estimé :</h3>
        <DateTime day="Lun 22/11" hours="13h22" />
        <p>
          Votre horaire de passage est succeptible de varier, il sera mis à jour
          en temps réel
        </p>
        <p>
          Vous serez prévenu par SMS quand vous devrez vous rendre sur place
        </p>
        <p>
          Vous pouvez prévoir votre temps de trajet en cliquant sur l’itinéraire
        </p>
        <ButtonOutline>Voir l’itinéraire</ButtonOutline>
      </MobileContent>
    </MobileLayout>
  );
}