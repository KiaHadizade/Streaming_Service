import { NextResponse } from "next/server";
import { getConnection } from "@/lib/db";

export async function GET(request) {
  try {
    const pool = await getConnection();
    const requestDb = pool.request();

    const { searchParams } = new URL(request.url);

    const type = searchParams.get("type");
    const sort = searchParams.get("sort");
    const search = searchParams.get("search");

    let query = `
SELECT
    c.content_id,
    c.title,
    c.description,
    c.release_year,
    c.score,
    c.type,
    c.duration,
    c.status,
    c.created_at,

    JSON_QUERY(
        COALESCE(
            (
                SELECT g.name
                FROM Categorized_as cg
                JOIN Genre g
                    ON cg.genre_id = g.genre_id
                WHERE cg.content_id = c.content_id
                FOR JSON PATH
            ),
            '[]'
        )
    ) AS genres,

    JSON_QUERY(
        COALESCE(
            (
                SELECT CONCAT(a.first_name, ' ', a.last_name) AS name
                FROM Performed_by pb
                JOIN Actor a
                    ON pb.actor_id = a.actor_id
                WHERE pb.content_id = c.content_id
                FOR JSON PATH
            ),
            '[]'
        )
    ) AS actors

FROM Content c
`;

    const conditions = [];

    if (type) {
      conditions.push("c.type = @type");
      requestDb.input("type", type);
    }

    if (search) {
      conditions.push("c.title LIKE @search");
      requestDb.input("search", `%${search}%`);
    }

    if (conditions.length > 0) {
      query += ` WHERE ${conditions.join(" AND ")}`;
    }

    switch (sort) {
      case "newest":
        query += " ORDER BY c.release_year DESC";
        break;

      case "oldest":
        query += " ORDER BY c.release_year ASC";
        break;

      case "highest-rated":
        query += " ORDER BY c.score DESC";
        break;

      case "lowest-rated":
        query += " ORDER BY c.score ASC";
        break;
    }

    const result = await requestDb.query(query);

    return NextResponse.json(result.recordset);
  } catch (error) {
    console.error(error);

    return NextResponse.json({ error: "Failed to fetch content" }, { status: 500 });
  }
}

/* import { NextResponse } from "next/server";
import { getConnection } from "@/lib/db";

export async function GET(request) {
  try {
    const pool = await getConnection();
    const requestDb = pool.request();

    const { searchParams } = new URL(request.url);
    const type = searchParams.get("type");

    let query = `
SELECT
    c.content_id,
    c.title,
    c.description,
    c.release_year,
    c.score,
    c.type,
    c.duration,
    c.status,
    c.created_at,

    JSON_QUERY(
        COALESCE(
            (
                SELECT g.name
                FROM Categorized_as cg
                JOIN Genre g
                    ON cg.genre_id = g.genre_id
                WHERE cg.content_id = c.content_id
                FOR JSON PATH
            ),
            '[]'
        )
    ) AS genres,

    JSON_QUERY(
        COALESCE(
            (
                SELECT CONCAT(a.first_name, ' ', a.last_name) AS name
                FROM Performed_by pb
                JOIN Actor a
                    ON pb.actor_id = a.actor_id
                WHERE pb.content_id = c.content_id
                FOR JSON PATH
            ),
            '[]'
        )
    ) AS actors

FROM Content c
`;

    // Filter by media type
    if (type) {
      query += ` WHERE c.type = @type`;
      requestDb.input("type", type);
    }

    const result = await requestDb.query(query);

    return NextResponse.json(result.recordset);
  } catch (error) {
    console.error(error);

    return NextResponse.json({ error: "Failed to fetch content" }, { status: 500 });
  }
} */
/* import { NextResponse } from "next/server";
import { getConnection } from "@/lib/db";

export async function GET() {
  try {
    const pool = await getConnection();

    const result = await pool.request().query(`

SELECT
    c.content_id,
    c.title,
    c.description,
    c.release_year,
    c.score,
    c.type,
    c.duration,
    c.status,
    c.created_at,

    -- genres array
    JSON_QUERY(
        COALESCE(
            (
                SELECT
                    g.name
                FROM Categorized_as cg
                JOIN Genre g
                    ON cg.genre_id = g.genre_id
                WHERE cg.content_id = c.content_id
                FOR JSON PATH
            ),
            '[]'
        )
    ) AS genres,

    -- actors array
    JSON_QUERY(
        COALESCE(
            (
                SELECT
                    CONCAT(a.first_name, ' ', a.last_name) AS name
                FROM Performed_by pb
                JOIN Actor a
                    ON pb.actor_id = a.actor_id
                WHERE pb.content_id = c.content_id
                FOR JSON PATH
            ),
            '[]'
        )
    ) AS actors

FROM Content c

`);
    return NextResponse.json(result.recordset);
  } catch (error) {
    console.error(error);

    return NextResponse.json({ error: "Failed to fetch content" }, { status: 500 });
  }
} */
/*     const result = await pool.request().query(`
      SELECT *
      FROM Content
    `); */
