
CREATE TABLE teams (id SERIAL PRIMARY KEY,
                           team_name varchar(30) UNIQUE,
                                                 motobike varchar(30),
                                                          moto_brand varchar(20),
                                                                     moto_image text,
                                                                    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
                                                                    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
                                                                    deleted_at TIMESTAMP null)
                                                                   ;
CREATE TABLE riders (id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
                             rider_code varchar(10) UNIQUE,
                                                    first_name varchar(10),
                                                               last_name varchar(10),
                                                                         date_of_birth date, nationality varchar, championship int, rider_image text, team_id int ,
                     FOREIGN KEY (team_id) REFERENCES teams(id),
                                                      active int DEFAULT 0,
                                                     created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
                                                     updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
                                                     deleted_at TIMESTAMP null)
                                                    ;







CREATE TABLE races (id SERIAL PRIMARY KEY,
                           race_name varchar (100),
                                     race_location text, info_bonus text NULL,
                                                                         member_in_race int, round_number int, race_code varchar(20),
                                                                                                                         active int, created_at timestamp DEFAULT CURRENT_TIMESTAMP,
                                                                                                                                                                  updated_at timestamp DEFAULT CURRENT_TIMESTAMP);


CREATE TABLE calendars (id SERIAL PRIMARY KEY,
                               race_id int, race_date date, race_time TIME,
                                                                      country varchar(20),
                        FOREIGN KEY (race_id) REFERENCES races(id),
                                                         active int, created_at timestamp DEFAULT CURRENT_TIMESTAMP,
                                                                                                  updated_at timestamp DEFAULT CURRENT_TIMESTAMP);


CREATE TABLE results (id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
                              rider_id UUID,
                                       race_id int, score_race_current int, TIME timestamptz,
                                                                                 first_finish boolean DEFAULT FALSE,
                      FOREIGN KEY (rider_id) REFERENCES riders(id),
                      FOREIGN KEY (race_id) REFERENCES races(id),
                                                       created_at timestamp DEFAULT CURRENT_TIMESTAMP,
                                                                                    updated_at timestamp DEFAULT CURRENT_TIMESTAMP);


CREATE TABLE champions (id SERIAL PRIMARY KEY,
                               rider_id UUID,
                                        season int, POINT int,
                        FOREIGN KEY (rider_id) REFERENCES riders(id));

